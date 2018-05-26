import { Joi } from 'celebrate';
import { TransferContract, ParticipateAssetIssueContract } from '../../sdks/wallet-api-v2/protocol/core/Contract_pb';
import { buildVote } from '../../sdks/wallet-api-v2/utils/transactionBuilder';
import { decode58Check } from '../../sdks/wallet-api-v2/utils/crypto';
import { participate } from './schema';

export default Joi
  .extend(joi => ({
    base: joi.string(),
    name: 'transfer',
    language: {
      from: 'should be a valid key',
      to: 'should be a valid key'
    },
    rules: [
      {
        name: 'from',
        validate(params, value, state, options) {
          try {
            const transferContract = new TransferContract();
            transferContract.setOwnerAddress(Uint8Array.from(decode58Check(value)));
            return value;
          } catch (e) {
            return this.createError('transfer.from', {}, state, options);
          }
        }
      },
      {
        name: 'to',
        validate(params, value, state, options) {
          try {
            const transferContract = new TransferContract();
            transferContract.setToAddress(Uint8Array.from(decode58Check(value)));
            return value;
          } catch (e) {
            return this.createError('transfer.to', {}, state, options);
          }
        }
      }
    ]
  }))
  .extend(joi => ({
    base: joi.object(),
    name: 'vote',
    language: {
      default: 'Vote structure is invalid'
    },
    rules: [
      {
        name: 'default',
        validate(params, value, state, options) {
          try {
            buildVote(state.parent.from, value);
            return value;
          } catch (e) {
            return this.createError('vote.default', {}, state, options);
          }
        }
      }
    ]
  }))
  .extend(joi => ({
    base: joi.string(),
    name: 'participate',
    language: {
      issuer: 'Issuer address is invalid'
    },
    rules: [
      {
        name: 'issuer',
        validate(params, value, state, options) {
          try {
            const participateContract = new ParticipateAssetIssueContract();
            participateContract
              .setToAddress(Uint8Array.from(decode58Check(value)));

            return value;
          } catch (e) {
            return this.createError('participate.issuer', {}, state, options);
          }
        }
      }
    ]
  }));
