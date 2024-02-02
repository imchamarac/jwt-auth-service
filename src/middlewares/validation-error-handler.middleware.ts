import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../enum/http-status-code.enum';
import { validationResult } from 'express-validator';

/* Custom error handler */
const validationErrorHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req).formatWith(error => error.msg);

    if (errors.isEmpty()) {
        return next();
    }

    res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: errors.mapped(),
    });
};

export default validationErrorHandler;
