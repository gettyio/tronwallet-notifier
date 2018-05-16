import { createLogger, format, transports } from 'winston';

const { printf, timestamp, colorize, simple, combine } = format;

const formatter = printf(info =>
  `[x] ${info.timestamp} - [${info.level}] - ${info.message}`
);

const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(
    timestamp(),
    colorize({ all: true }),
    simple(),
    formatter
  )
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

export default logger;
