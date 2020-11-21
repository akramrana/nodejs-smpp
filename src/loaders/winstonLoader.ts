import {MicroframeworkLoader, MicroframeworkSettings} from 'microframework';
import {configure, format, transports} from 'winston';


export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  configure({
    transports: [
      new transports.File({
          filename: 'runtime/logs/error.log',
          level: 'error',
          handleExceptions: true,
          format: format.combine(
            format.timestamp(),
            format.json()
          )
      }),
      // new transports.File({filename: 'runtime/http.log', level: 'http'}),
      new transports.Console({
        level: process.env.LOG_LEVEL,
        handleExceptions: true,
        format: process.env.NODE_ENV !== 'development'
          ? format.combine(
            format.json()
          )
          : format.combine(
            format.colorize(),
            format.simple()
          ),
      }),
    ],
  });
};
