import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import { ServerConfig } from './config/server.config';
import { StudentController } from './modules/student/student.controller';
import { OrmConfig } from './config/config.orm';
import { RegisterRoutes } from './config/register-routes.config';

async function bootstrap() {

    config();

    const app: express.Application = express();

    // Database Connection
    await OrmConfig.connect();

    // Server configurations
    ServerConfig.forRoot(app);

    // Register of routes
    RegisterRoutes.bootstrapRoutes([
        StudentController,
    ], app);

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Application listening on port ${process.env.PORT ? process.env.PORT : 3000}`);
    });
}

bootstrap();