import morgan from 'morgan';
import logger from '../utils/logger.mjs';

// Define a custom Morgan format and integrate it with Winston
const httpLogger = morgan(
    (tokens, req, res) => {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens['response-time'](req, res), 'ms'
        ].join(' ');
    },
    {
        stream: {
            write: (message) => logger.http(message.trim()) // Uses Winston's HTTP log level
        }
    }
);

export default httpLogger;
