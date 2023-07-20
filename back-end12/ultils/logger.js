import log4js from 'log4js';

const logger = log4js.getLogger();

log4js.configure({
    appenders: {
        console: { type: 'console' },
        access: { type: 'file', filename: 'access.log' }
    },
    categories: {
        default: { appenders: ['console'], level: 'debug' },
        access: { appenders: ['access'], level: 'info' }
    }
});

export default function loggingMiddleware() {
    return log4js.connectLogger(logger, { level: 'auto' });
}