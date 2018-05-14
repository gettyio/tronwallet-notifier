import axios from 'axios';

export function getRates(origin, end) {
  return axios.get(`https://free.currencyconverterapi.com/api/v5/convert?q=${origin}_${end}&compact=y`);
}

export async function convert(amount, origin, end) {
  const { data: rates } = await getRates(origin, end);
  return amount * rates[`${origin}_${end}`].val;
}
