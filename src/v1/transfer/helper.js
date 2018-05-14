import StellarSdk from 'stellar-sdk';
import config from 'config';

import { convert } from '../../utils/helpers';
import * as messages from './messages';

const server = new StellarSdk.Server(config.get('STELLAR_NETWORK_URL'));
StellarSdk.Network.useTestNetwork();

const ISSUER_PRIVATE_KEY = config.get('ISSUER_PRIVATE_KEY');
const DISTRIBUTOR_PRIVATE_KEY = config.get('DISTRIBUTOR_PRIVATE_KEY');

const issuerAccount = StellarSdk.Keypair.fromSecret(ISSUER_PRIVATE_KEY);
const distributorAccount = StellarSdk.Keypair.fromSecret(DISTRIBUTOR_PRIVATE_KEY);

export const exchange = async ({ amount, originCurrency, destinationCurrency }) => {
  const asset = new StellarSdk.Asset(`BCE${destinationCurrency}`, issuerAccount.publicKey());
  const value = await convert(amount, originCurrency, destinationCurrency) * 0.01; // charge 1% fee;

  return {
    value,
    asset
  };
};

export const createXDRTransaction = (signedXDR) => {
  try {
    return new StellarSdk.Transaction(signedXDR);
  } catch (e) {
    throw messages.INVALID_XDR;
  }
};

export const loadPublicAccount = (publicKey) => {
  try {
    return StellarSdk.Keypair.fromPublicKey(publicKey);
  } catch (e) {
    throw messages.INVALID_PUBLIC_KEY;
  }
};

export const emit = async (io, payload) => {
  io.emit('payback', payload);
  return payload;
};

export const transfer = async (io, { signedXDR, receiverPublicKey, currency, originId }) => {  
  const signedTransaction = createXDRTransaction(signedXDR);

  const receivingAccount = loadPublicAccount(receiverPublicKey);
  const distributor = await server.loadAccount(distributorAccount.publicKey());

  const { asset, value } = await exchange(currency);
  const depositToReceiver = new StellarSdk.TransactionBuilder(distributor)
    .addOperation(StellarSdk.Operation.payment({
      destination: receivingAccount.publicKey(),
      asset,
      amount: parseFloat(value).toFixed(7)
    }))
    .build();

  depositToReceiver.sign(distributorAccount);

  try {
    const responseSignedTransaction = await server.submitTransaction(signedTransaction);
    const responseReceiver = await server.submitTransaction(depositToReceiver);

    const emitPayback = await emit(io, { originId, succeeded: true });

    return {
      responseSignedTransaction,
      responseReceiver,
      emitPayback
    };
  } catch (err) {
    return { err };
  }
};
