import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { userService } from '../services';
import { tryCatch } from '../utils/try-catch-hof';
import { generateEncryptedToken } from '../utils';
import { HttpStatusCode } from '../enum/http-status-code.enum';

const handleLogin = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);

        if (!user) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: 'Incorrect email or password, please check again!',
            });
            return next();
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: 'Incorrect email or password, please check again!',
            });
            return next();
        }

        // call JWT service to generate a token
        const token = await generateEncryptedToken(user);

        res.status(HttpStatusCode.OK).json({
            success: true,
            message: 'Login successful',
            token,
        });

        next();
    }
);

const handleRegister = tryCatch(async (req: Request, res: Response) => {
    const { email, password, first_name, last_name, role } = req.body;

    const user = await userService.getUserByEmail(email);

    if (user) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            success: false,
            message: 'User with email already exists!',
        });
    }

    const response = await userService.createUser({
        email,
        password,
        first_name,
        last_name,
        role,
    });

    if (response) {
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: 'User created successfully',
            userId: response,
        });
    }
});

const handleLoginAction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            req.flash(
                'error',
                'Incorrect email or password, please check again!'
            );
            res.redirect('/login');
            return next();
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.flash(
                'error',
                'Incorrect email or password, please check again!'
            );
            res.redirect('/login');
            return next();
        }

        // call JWT service to generate a token for the user
        const token = await generateEncryptedToken(user);

        // set generated jwt token in the cookie
        res.cookie(String(process.env.APP_COOKIE_KEY), token, {
            secure: Boolean(process.env.APP_COOKIE_SECURE),
            httpOnly: Boolean(process.env.APP_COOKIE_HTTP_ONLY),
            maxAge: Number(process.env.APP_COOKIE_EXPIRES_IN), // 8 hours
            domain: String(process.env.APP_COOKIE_DOMAIN),
            sameSite: process.env.APP_COOKIE_SAME_SITE as 'lax',
        });

        res.redirect('/');
    } catch (error: unknown) {
        req.flash('error', 'Error occurred while logging, please try again!');
        res.redirect('/');
        throw error;
    }
};

const handleRegisterAction = async (req: Request, res: Response) => {
    const { email, password, first_name, last_name, role } = req.body;
    
    try {
        const user = await userService.getUserByEmail(email);

        if (user) {
            req.flash(
                'error',
                JSON.stringify({ pageError: 'User with email already exists!' })
            );
            return res.redirect('/register');
        }

        const response = await userService.createUser({
            email,
            password,
            first_name,
            last_name,
            role,
        });

        if (response) {
            req.flash('formCompleted', 'true');
            res.redirect('/register');
        }
    } catch (error: unknown) {
        req.flash(
            'error',
            JSON.stringify({
                pageError: 'Error occurred while saving, please try again!',
            })
        );
        res.redirect('/register');
        // throw error;
    }
};

export { handleLoginAction, handleLogin, handleRegisterAction, handleRegister };
