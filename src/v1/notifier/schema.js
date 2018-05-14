import { Joi } from 'celebrate';

export const payback = {
  body: {
    uuid: Joi.string().required(),
    succeeded: Joi.boolean().required()
  }
};
