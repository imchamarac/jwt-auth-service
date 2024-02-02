import express, { NextFunction, Request, Response } from 'express';
import {
    adminPrivileged,
    authenticated,
} from '../../middlewares/auth.middleware';
import { User, UserRole } from '../../models/pg/users.model';

const privateWebRoutes = express.Router();

privateWebRoutes.get('/', authenticated, (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    }

    res.render('home', {
        title: 'Home',
        name: req.user?.first_name,
    });
});

privateWebRoutes.get(
    '/account',
    authenticated,
    (req: Request, res: Response) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        }

        const { first_name, last_name, email, role } = req.user as User;

        const user = {
            first_name,
            last_name,
            email,
            role:
                role === UserRole.SUPER_ADMIN
                    ? 'Super admin'
                    : role === UserRole.ADMIN
                      ? 'Admin'
                      : 'User',
        };

        res.render('account', { title: 'Account', ...user });
    }
);

privateWebRoutes.get(
    '/admin',
    authenticated,
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        }

        next();
    },
    adminPrivileged,
    (req: Request, res: Response) => {
        const { first_name } = req.user as User;

        let message = `Ops! ${first_name}, you have no permission to view this page.`;

        if (res.locals.isAdmin) {
            message = `TA DA! ${first_name}, you have admin permission to view this page.`;
        }
        res.render('admin', { title: 'Admin page', message });
    }
);

export default privateWebRoutes;
