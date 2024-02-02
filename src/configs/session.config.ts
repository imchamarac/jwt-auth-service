import { getHashSecret } from '../utils';

type SessionConfig = {
    secret: string;
    saveUninitialized: boolean;
    resave: boolean;
    cookie: {
        maxAge: number;
        HttpOnly: boolean;
    };
};

export const sessionConfig: SessionConfig = {
    secret: getHashSecret(),
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 10000, HttpOnly: true },
};
