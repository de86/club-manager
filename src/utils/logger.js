const {inspect} = require('util');

const {
    config,
    createLogger,
    format,
    transports,
} = require('winston');

const {
    colorize,
    combine,
    errors,
    label,
    json,
    metadata,
    printf,
    timestamp,
} = format

/**
 * Log Levels - NPM Standard
 * 
 * error: 0,
 * warn: 1,
 * info: 2,
 * http: 3,
 * verbose: 4,
 * debug: 5,
 * silly: 6
 */

const appendJsonToMessage = format((info) => {
    if (info.metadata && Object.keys(info.metadata).length) {
        info.message = `${info.message} ${inspect(info.metadata, {breakLength: Infinity})}`
    }
    
    return info;
});

const logger = createLogger({
    levels: config.syslog.levels,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        label({ label: 'club-manager', message: false }),
        errors({ stack: true }),
        metadata({fillExcept: ['message', 'level', 'timestamp', 'label', 'service']}),
        printf(({level, message, label, timestamp}) => `${timestamp} ${level} [${label}] | ${message}`),
    ),
    defaultMeta: { service: 'club-manager-api' },
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/http.log', level: 'http' }),
        new transports.File({ filename: './logs/combined.log', level: 'debug'}),
    ],
  });

  // If we're not in production then also log to the console
  if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
    logger.add(new transports.Console({
        format: combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            label({ label: 'club-manager', message: false }),
            errors({ stack: true }),
            json(),
            appendJsonToMessage(),
            colorize(),
            printf(({level, message, label, timestamp}) => `${timestamp} [${label}] ${level} | ${message}`),
        ),
    }));
}

module.exports = logger;
