import ApiClient from './../../sdks/wallet-api-v2/client/explorer';
import { byteArray2hexStr } from './../../sdks/wallet-api-v2/utils/bytes';
import {
  buildTransferTransaction
} from './../../sdks/wallet-api-v2/utils/transactionBuilder';

export const ONE_TRX = 1000000;
const explorer = new ApiClient();

export const transfer = async ({ from, token, to, amount }) => {
  const rawTransaction = buildTransferTransaction(token, from, to, amount * ONE_TRX);

  const transaction = await explorer.addRef(rawTransaction);
  const transactionBytes = transaction.serializeBinary();
  const transactionHash = byteArray2hexStr(transactionBytes);

  return { transaction: transactionHash };
};
