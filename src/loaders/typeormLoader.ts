import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { createConnection, getConnectionOptions } from 'typeorm';
// import * as dotenv from 'dotenv';
export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: process.env.TYPEORM_CONNECTION as any, // See createConnection options for valid types
        host: process.env.TYPEORM_HOST as any,
        port: 1433, 
        username: process.env.TYPEORM_USERNAME as any,
        password: process.env.TYPEORM_PASSWORD as any,
        database: process.env.TYPEORM_DATABASE as any,
        synchronize: false,
        extra: {
            options: {
              encrypt: false,
              enableArithAbort:true,
            },
          }, 
        logging: false,
        // logger: ['advanced-console'] as any,
        // entities: ["src/models"] as any,
        entities: [process.env.APP_SRC_PATH+"/models/**/*.*"] as any,
        // migrations: ["src/migration"] as any,
    });
    const connection = await createConnection(connectionOptions);

    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
