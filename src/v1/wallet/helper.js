import ApiClient from './../../sdks/wallet-api-v2/client/explorer';
import { byteArray2hexStr } from './../../sdks/wallet-api-v2/utils/bytes';
import {
  buildTransferTransaction,
  buildVote,
  buildAssetParticipate,
  buildAssetIssue,
  buildFreezeBalance,
  buildUnfreezeBalance
} from './../../sdks/wallet-api-v2/utils/transactionBuilder';

export const ONE_TRX = 1000000;
const explorer = new ApiClient();

export const serializeTransaction = async (rawTransaction) => {
  const transaction = await explorer.addRef(rawTransaction);
  const transactionBytes = transaction.serializeBinary();
  const transactionHash = byteArray2hexStr(transactionBytes);

  return { transaction: transactionHash };
};

export const transfer = async ({ from, token, to, amount }) => {
  const rawTransaction = buildTransferTransaction(token, from, to, amount * ONE_TRX);
  return await serializeTransaction(rawTransaction);
};

export const vote = async ({ from, votes }) => {
  const rawTransaction = buildVote(from, votes);
  return await serializeTransaction(rawTransaction);
};

export const participate = async ({ from, issuer, token, amount }) => {
  const rawTransaction = buildAssetParticipate(from, issuer, token, amount * ONE_TRX);
  return await serializeTransaction(rawTransaction);
};

export const createToken = async ({ form, from }) => {
  const frozenSupply = form.freezeAmount > 0 ? [{
    amount: form.freezeAmount,
    days: form.freezeDays
  }] : null;

  const rawTransaction = buildAssetIssue({
    ...form,
    address: from,
    frozenSupply
  });

  return await serializeTransaction(rawTransaction);
};

export const freeze = async ({ from, amount, duration }) => {
  const rawTransaction = buildFreezeBalance(from, amount * ONE_TRX, duration);
  return await serializeTransaction(rawTransaction);
};

export const unfreeze = async ({ from }) => {
  const rawTransaction = buildUnfreezeBalance(from);
  return await serializeTransaction(rawTransaction);
};
