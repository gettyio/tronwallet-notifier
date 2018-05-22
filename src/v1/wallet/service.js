import { Router } from 'express';
import celebrate from 'celebrate';
import { transfer } from './schema';
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

export default router;