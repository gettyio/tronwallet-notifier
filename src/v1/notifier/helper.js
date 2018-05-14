export const emit = async (io, payload) => {
  io.emit('payback', payload);
  return payload;
};
