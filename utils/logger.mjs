import winston from 'winston';

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'magenta'
});

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(), // Enables colors
    winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })
);

const logger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    level: 'http',
    format: logFormat,
    transports: [
        new winston.transports.Console(), // Console output with colors
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

export default logger;
