import * as constants from './constants';

export const syntaxHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json(constants.UNFORMATTED_JSON);
  }

  return next();
};
