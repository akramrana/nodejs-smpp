import {Application} from 'express';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import {MicroframeworkLoader, MicroframeworkSettings} from 'microframework';
import {useExpressServer} from 'routing-controllers';
import helmet from "helmet";
import * as path from 'path';
export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const connection = settings.getData('connection');
        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const port = process.env.APP_PORT || 5000;
        const app = express();

        app.use(bodyParser.raw({limit: '250MB'}))
        app.use(bodyParser.json({limit: '250MB'}));
        app.use(bodyParser.urlencoded({limit: '250MB', extended: true}));
        app.use(bodyParser.text({limit: '250MB'}));
        app.use(helmet());
        /*
        * Allowing cors for origin
        * */
        app.use(cors({
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
        app.use('/uploads', express.static(path.join(__dirname, '../../', 'uploads')));

        const expressApp: Application = useExpressServer(app, {
            //cors: true,
            classTransformer: true,
            routePrefix: process.env.APP_ROUTE_PREFIX,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: [process.env.APP_SRC_PATH + "/controllers/**/*Controller.*"],
            // controllers: [AdminController],
            // middlewares: env.app.dirs.middlewares,
            // interceptors: env.app.dirs.interceptors,
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
