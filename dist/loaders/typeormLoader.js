"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormLoader = void 0;
const typeorm_1 = require("typeorm");
// import * as dotenv from 'dotenv';
exports.typeormLoader = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    const loadedConnectionOptions = yield typeorm_1.getConnectionOptions();
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: process.env.TYPEORM_CONNECTION,
        host: process.env.TYPEORM_HOST,
        port: 1433,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: false,
        extra: {
            options: {
                encrypt: false,
                enableArithAbort: true,
            },
        },
        logging: false,
        // logger: ['advanced-console'] as any,
        // entities: ["src/models"] as any,
        entities: [process.env.APP_SRC_PATH + "/models/**/*.*"],
    });
    const connection = yield typeorm_1.createConnection(connectionOptions);
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
});
//# sourceMappingURL=typeormLoader.js.map