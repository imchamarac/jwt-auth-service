import passport from 'passport';
import passportJwt from 'passport-jwt';
import { Request } from 'express';

import { userService } from '.';
import { getHashSecret, readToken } from '../utils';
import { type User as UserModel } from './../models/pg/users.model';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User extends UserModel {}
    }
}

// cookie extractor to get the token from the cookie
const tokenExtractor = (req: Request): any => {
    let token = null;

    if (req && req.cookies) {
        token =
            req?.cookies[String(process.env.APP_COOKIE_KEY)] ||
            req?.headers['authorization'];
        if (!token) {
            return null;
        } else {
            return readToken(token, getHashSecret());
        }
    }
};

// custom extractor function used to extract token from the cookie
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        tokenExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
    secretOrKey: getHashSecret(),
};

/*
 * Strategy runs after extractor function as it pass the decrypted token into the strategy.
 * Then Strategy looks for the user from the database to verify the user.
 * If user found then user get attached to the request, which will be avilable during rquest's lifecycle.
 * If not user found, it will throw an error and exits.
 */
const jwtLogin = new JwtStrategy(jwtOptions, async ({ email }, done) => {
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            done(null, false, { message: 'Invalid token!' });
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

passport.use(jwtLogin);

export const initializePassport = () => passport.initialize();
