import { Joi } from 'celebrate';

export const transfer = {
  body: Joi.object().keys({
    currency: Joi.object().keys({
      amount: Joi.number().integer().min(1).required(),
      originCurrency: Joi.string().required(),
      destinationCurrency: Joi.string().required()
    }).required(),
    originId: Joi.string().required(),
    signedXDR: Joi.string().required(),
    receiverPublicKey: Joi.string().required()
  })
};

export const payback = {
  body: {
    uuid: Joi.string().required(),
    succeeded: Joi.boolean().required()
  }
};
