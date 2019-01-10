"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const fs = require("fs");
const winston = require("winston");
const PATHS = {
    LOG: `${process.cwd()}/logs`,
    LOG_ERROR: `${process.cwd()}/logs/_error.log`,
    LOG_INFO: `${process.cwd()}/logs/_info.log`,
};
// ensure log directory exists
(() => fs.existsSync(PATHS.LOG) || fs.mkdirSync(PATHS.LOG))();
exports.dbg = debug('express:server');
exports.logger = winston.createLogger({
    exitOnError: false,
    format: winston.format.combine(winston.format.splat(), winston.format.simple()),
    transports: [
        new winston.transports.File({
            filename: PATHS.LOG_INFO,
            handleExceptions: true,
            level: 'info',
            maxFiles: 2,
            maxsize: 5242880,
        }),
        new winston.transports.File({
            filename: PATHS.LOG_ERROR,
            handleExceptions: true,
            level: 'error',
            maxFiles: 2,
            maxsize: 5242880,
        }),
        new winston.transports.Console({
            handleExceptions: true,
            level: 'debug',
        }),
    ],
});
//# sourceMappingURL=logger.js.map