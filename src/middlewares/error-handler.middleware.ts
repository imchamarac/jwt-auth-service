import { NextFunction, Request, Response } from 'express';
import { httpErrorMessage } from '../constants/http-error-message.constant';
import { HttpStatusCode } from '../enum/http-status-code.enum';
import Logger from '../utils/logger';

/* Custom error handler */
const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const code: HttpStatusCode =
        res.statusCode || HttpStatusCode.INTERNAL_SERVER;

    const err = {
        code,
        title: httpErrorMessage[code],
        error: error.message,
        stackTrace: error.stack,
    };

    Logger.error(err);

    res.json(err);
    next();
};

export default errorHandler;
