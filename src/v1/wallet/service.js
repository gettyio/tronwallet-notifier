import { Router } from 'express';
import celebrate from 'celebrate';
import { transfer, vote, participate, createToken, freeze, unfreeze } from './schema';
import * as API from './helper';

const router = new Router();

router.post('/transfer', celebrate(transfer), ({ body }, res) => {
  API.transfer(body)
    .then(data => res.status(200).json(data))
    .catch(({ message }) => res.status(500).json({
      error: { message, status: 500 },
      body
    }));
});

router.post('/vote', celebrate(vote), ({ body }, res) => {
  API.vote(body)
    .then(data => res.status(200).json(data))
    .catch(({ message }) => res.status(500).json({
      error: { message, status: 500 },
      body
    }));
});

router.post('/participate', celebrate(participate), ({ body }, res) => {
  API.participate(body)
    .then(data => res.status(200).json(data))
    .catch(({ message }) => res.status(500).json({
      error: { message, status: 500 },
      body
    }));
});

router.post('/create-token', celebrate(createToken), ({ body }, res) => {
  API.createToken(body)
    .then(data => res.status(200).json(data))
    .catch(({ message }) => res.status(500).json({
      error: { message, status: 500 },
      body
    }));
});

router.post('/freeze', celebrate(freeze), ({ body }, res) => {
  API.freeze(body)
    .then(data => res.status(200).json(data))
    .catch(({ message }) => res.status(500).json({
      error: { message, status: 500 },
      body
    }));
});

router.post('/unfreeze', celebrate(unfreeze), ({ body }, res) => {
  API.unfreeze(body)
    .then(data => res.status(200).json(data))
    .catch(({ message }) => res.status(500).json({
      error: { message, status: 500 },
      body
    }));
});


export default router;
