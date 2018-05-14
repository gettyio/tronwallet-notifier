import { Router } from 'express';
import celebrate from 'celebrate';
import { transfer, payback } from './schema';
import * as API from './helper';

const router = new Router();

router.post('/try-payback', celebrate(payback), ({ app, body }, res) => {
  const { io } = app;

  API.emit(io, { ...body })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
});

router.post('/', celebrate(transfer), ({ app, body }, res) => {
  const { io } = app;
  
  API.transfer(io, body)
    .then(data => res.status(200).json(data))
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
});

export default router;
