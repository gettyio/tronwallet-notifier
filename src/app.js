// NPM Modules
import SocketIO from 'socket.io';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import celebrate from 'celebrate';
import config from 'config';

// Configs and Utils
import logger from './config/logger';
import * as constants from './config/constants';
import { syntaxHandler } from './config/utils';

// Routes
import notifier from './v1/notifier/service';

const app = express();
const port = config.get('PORT');
const server = http.createServer(app);
const io = new SocketIO().listen(server);

app.io = io;

// Express Configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev', { stream: logger.stream }));

// Routes Import
app.use('/v1/notifier', notifier);

// REST Schema Handler
app.use(celebrate.errors());

// Syntax Handler (400)
app.use(syntaxHandler);

// Router Handler (404)
app.use((req, res) => {
  console.log(req, res);
  res.status(404).json(constants.NOT_FOUND_MESSAGE);
});

server.listen(port, () => logger.info(`${constants.REST_STARTED} ${port}`));

// logger.info(`${constants.SOCKET_STARTED} ${socketPort}`);
io.sockets.on('connection', function () {
  logger.info('Handshake was done');
});
