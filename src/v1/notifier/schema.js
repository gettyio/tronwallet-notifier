import { Joi } from 'celebrate';

export const emit = {
  body: {
    uuid: Joi.string().required(),
    succeeded: Joi.boolean().required()
  }
};
