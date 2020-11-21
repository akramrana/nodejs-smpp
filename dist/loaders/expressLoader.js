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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoader = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routing_controllers_1 = require("routing-controllers");
const helmet_1 = __importDefault(require("helmet"));
const path = __importStar(require("path"));
exports.expressLoader = (settings) => {
    if (settings) {
        const connection = settings.getData('connection');
        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const port = process.env.APP_PORT || 5000;
        const app = express_1.default();
        app.use(bodyParser.raw({ limit: '250MB' }));
        app.use(bodyParser.json({ limit: '250MB' }));
        app.use(bodyParser.urlencoded({ limit: '250MB', extended: true }));
        app.use(bodyParser.text({ limit: '250MB' }));
        app.use(helmet_1.default());
        /*
        * Allowing cors for origin
        * */
        app.use(cors_1.default({
            origin: '*'
        }));
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
            res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-type,Accept, Auth, Access-Control-Allow-Origin');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
        /*
        * Adding uploads url and setting path for that
        * */
        app.use('/uploads', express_1.default.static(path.join(__dirname, '../../', 'uploads')));
        const expressApp = routing_controllers_1.useExpressServer(app, {
            //cors: true,
            classTransformer: true,
            routePrefix: process.env.APP_ROUTE_PREFIX,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: [process.env.APP_SRC_PATH + "/controllers/**/*Controller.*"],
        });
        // parse application/x-www-form-urlencoded
        // expressApp.use(bodyParser.urlencoded({extended: true}));
        // expressApp.use(bodyParser.json({limit: '50mb'}));
        // Run application to listen on given port
        // if (!env.isTest) {
        const server = expressApp.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
        settings.setData('express_server', server);
        // }
        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
};
//# sourceMappingURL=expressLoader.js.map