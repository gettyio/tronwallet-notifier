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

export const vote = {
  body: {
    from: Types.transfer().from().required(),
    votes: Types.vote().default().required()
  }
};

export const participate = {
  body: {
    from: Types.transfer().from().required(),
    issuer: Types.participate().issuer().required(),
    token: Joi.string().required(),
    amount: Joi.number().integer().required()
  }
};

export const createToken = {
  body: {
    from: Types.transfer().from().required(),
    form: Joi.object().keys({
      freezeAmount: Joi.number().integer().required(),
      freezeDays: Joi.number().integer().required(),
      acceptTerms: Joi.boolean().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      totalSupply: Joi.number().integer().required(),
      url: Joi.string().required(),
      trxNum: Joi.number().required(),
      num: Joi.number().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required()
    })
  }
};

export const freeze = {
  body: {
    from: Types.transfer().from().required(),
    amount: Types.number().integer().required(),
    duration: Types.string().required()
  }
};

export const unfreeze = {
  body: {
    from: Types.transfer().from().required()
  }
};
