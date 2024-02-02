import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User, adminRoles } from '../models/pg/users.model';
import { HttpStatusCode } from '../enum/http-status-code.enum';

const authenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: Error, user: User) => {
        if (err) return next(err);

        if (user) req.user = user;

        return next();
    })(req, res, next);
};

const unauthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: Error, user: User) => {
        if (err) return next(err);

        if (user) return res.redirect('/');

        return next();
    })(req, res, next);
};

const apiAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        'jwt',
        (err: Error, user: User, info: { message: string }) => {
            if (err) {
                throw err;
            } else if (!user) {
                res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success: false,
                    error: info.message,
                });
                return;
            }

            req.user = user;
            next();
        }
    )(req, res, next);
};

const adminPrivileged = (req: Request, res: Response, next: NextFunction) => {
    const isAdmin = adminRoles.includes(req.user?.role || 3);
    res.locals.isAdmin = isAdmin;
    next();
};

export { authenticated, unauthenticated, apiAuthenticated, adminPrivileged };
