import { NextFunction, Request, Response } from 'express';

/* Custom function to catch errors and pass it down to the custom error handler middleware */
export const tryCatch =
    (
        controller: (req: Request, res: Response, next: NextFunction) => void,
        status: number = 500
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            res.status(status);
            next(error);
        }
    };
