import axios from 'axios';
import config from 'config';
import { INVALID_HASH } from './messages';

export const deserialize = (transaction) => {
  const URL = config.get('DESERIALIZE_SCAN_URL');
  return axios.post(URL, { transaction });
};

export const emit = async (io, payload) => {
  try {

    const { data: { transaction } } = await deserialize(payload.hash);
    const payback = { ...payload, transaction };

    io.emit('payback', payback);
    return payback;

  } catch (e) {
    throw new Error(INVALID_HASH);
  }
};
