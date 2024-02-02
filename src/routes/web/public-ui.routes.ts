import express, { NextFunction, Request, Response } from 'express';
import { unauthenticated } from '../../middlewares/auth.middleware';
import { authValidator } from '../../validators';
import { validationResult } from 'express-validator';
import { authController } from '../../controllers';

const publicWebRoutes = express.Router();

// Login web route
publicWebRoutes.get(
    '/login',
    unauthenticated,
    (req: Request, res: Response) => {
        res.render('login', { title: 'Login', error: req?.flash('error') });
    }
);

// User register web route
publicWebRoutes.get(
    '/register',
    unauthenticated,
    (req: Request, res: Response) => {
        res.render('register', {
            title: 'Register',
            error: req?.flash('error')[0],
            first_name: req?.flash('first_name')[0],
            last_name: req?.flash('last_name')[0],
            email: req?.flash('email')[0],
            password: req?.flash('password')[0],
            formCompleted: req?.flash('formCompleted')[0] || 'false',
        });
    }
);

// User login post request
publicWebRoutes.route('/login').post(
    authValidator.loginValidator,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).formatWith(error => error.msg);

        if (errors.isEmpty()) {
            return next();
        }

        req.flash('error', JSON.stringify(errors.mapped()));
        res.redirect('/login');
    },
    authController.handleLoginAction
);

// User registration post request
publicWebRoutes.route('/register').post(
    authValidator.registerValidator,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).formatWith(error => error.msg);

        if (errors.isEmpty()) {
            return next();
        }

        const { first_name, last_name, email, password } = req.body;

        req.flash('error', JSON.stringify(errors.mapped()));
        req.flash('first_name', first_name);
        req.flash('last_name', last_name);
        req.flash('email', email);
        req.flash('password', password);

        res.redirect('/register');
    },
    authController.handleRegisterAction
);

publicWebRoutes
    .route('/logout')
    .post((req: Request, res: Response, next: NextFunction) => {
        req.logout(err => {
            if (err) {
                return next(err);
            }
            res.clearCookie(String(process.env.APP_COOKIE_KEY));
            res.redirect('/login');
        });
    });

export default publicWebRoutes;
