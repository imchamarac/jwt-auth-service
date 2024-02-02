import express from 'express';
import helmet from 'helmet';
import sessions from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes';
import { errorHandler } from './middlewares';
import { initializePassport } from './services/passport.service';
import { helmetConfigs, sessionConfig } from './configs';
import Logger from './utils/logger';
import openapiSpec from './docs/openapi.json';

const app = express();

// Logger
app.use(morgan('common'));

// Parses JSON objects in requests
app.use(express.json());

// Parses request bodies
app.use(express.urlencoded({ extended: false }));

// Parses and extract cookie data from HTTP requests
app.use(cookieParser());

// Content security
app.use(helmet(helmetConfigs));

// CORS
app.use(cors());

// Compress all responses
app.use(compression());

// Handles user session
app.use(sessions(sessionConfig));

// Initialize passport
app.use(initializePassport());

// setup flash messages
app.use(flash());

// set up view engine and layout
app.use(expressLayouts);
app.set('views', path.join(__dirname, '../views'));
app.set('layout', path.join(__dirname, '../views/layout/main'));
app.set('view engine', 'ejs');

// App routes
app.use('/', routes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Custom error handler middleware
app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'views')));

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.API_PORT, () => {
        Logger.info(`Server is running on port: ${process.env.API_PORT}`);
    });
}

export default app;
