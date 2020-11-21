"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLoader = void 0;
const winston_1 = require("winston");
exports.winstonLoader = (settings) => {
    winston_1.configure({
        transports: [
            new winston_1.transports.File({
                filename: 'runtime/logs/error.log',
                level: 'error',
                handleExceptions: true,
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
            }),
            // new transports.File({filename: 'runtime/http.log', level: 'http'}),
            new winston_1.transports.Console({
                level: process.env.LOG_LEVEL,
                handleExceptions: true,
                format: process.env.NODE_ENV !== 'development'
                    ? winston_1.format.combine(winston_1.format.json())
                    : winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            }),
        ],
    });
};
//# sourceMappingURL=winstonLoader.js.map