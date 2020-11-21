"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
require("reflect-metadata");
const microframework_1 = require("microframework");
const iocLoader_1 = require("./loaders/iocLoader");
const typeormLoader_1 = require("./loaders/typeormLoader");
const expressLoader_1 = require("./loaders/expressLoader");
const winstonLoader_1 = require("./loaders/winstonLoader");
/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
    path: path.join(process.cwd(), `.env${((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '' : '.' + process.env.NODE_ENV)}`),
});
/*const log = new Logger(__filename);
log.error('this is test error');*/
/*
* Setting server path to this file directory in env file
* */
process.env['APP_SRC_PATH'] = __dirname;
microframework_1.bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        winstonLoader_1.winstonLoader,
        iocLoader_1.iocLoader,
        typeormLoader_1.typeormLoader,
        expressLoader_1.expressLoader,
    ],
})
    .then(() => console.log('Application running successfully!'))
    .catch(error => console.log('Application is crashed: ' + error));
//# sourceMappingURL=index.js.map