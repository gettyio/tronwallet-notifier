import { Joi } from 'celebrate';
import Types from './types';

export const transfer = {
  body: {
    from: Types.transfer().from().required(),
    token: Joi.string().required(),
    to: Types.transfer().to().required(),
    amount: Joi.number().integer().required(),
  }
};