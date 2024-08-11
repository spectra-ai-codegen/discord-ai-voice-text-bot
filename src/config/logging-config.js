const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;
const { LOG_LEVEL, LOG_FORMAT } = require('./env-config');

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: LOG_LEVEL || 'info',
  format: combine(
    label({ label: 'Discord AI Bot' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

module.exports = { logger };