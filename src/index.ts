import express, {Application} from "express";
import * as dotenv from 'dotenv';
import * as path from "path";
import "reflect-metadata";
import {bootstrapMicroframework} from "microframework";
import {iocLoader} from "./loaders/iocLoader";
import {typeormLoader} from "./loaders/typeormLoader";
import {expressLoader} from "./loaders/expressLoader";
import {winstonLoader} from './loaders/winstonLoader';
import {Logger} from './lib/logger';


/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config(
  {
    path: path.join(process.cwd(), `.env${((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '' : '.' + process.env.NODE_ENV)}`),
  }
); 

/*const log = new Logger(__filename);
log.error('this is test error');*/
/*
* Setting server path to this file directory in env file
* */
process.env['APP_SRC_PATH'] = __dirname;


bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [
    winstonLoader,
    iocLoader,
    typeormLoader,
    expressLoader,
  ],
})
  .then(() => console.log('Application running successfully!'))
  .catch(error => console.log('Application is crashed: ' + error));
