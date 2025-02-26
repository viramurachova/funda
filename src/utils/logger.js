import winston from 'winston';

// Function to format timestamp in European format (DD-MM-YYYY HH:mm:ss)
const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleString('nl-NL', {
        timeZone: 'Europe/Amsterdam',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(',', '');
};

// Define log format
const logFormat = winston.format.printf(({level, message}) => {
    return `[${formatTimestamp()}] ${level.toUpperCase()}: ${message}`;
});

// Create Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({filename: 'logs/test.log'})
    ],
});

export default logger;