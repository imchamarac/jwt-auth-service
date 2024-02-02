import jwt from 'jsonwebtoken';
import {
    createHash,
    createCipheriv,
    createDecipheriv,
    randomBytes,
} from 'crypto';
import { User } from '../models/pg/users.model';
import Logger from './logger';

const ALGORITHM = 'aes-256-cbc';

const getRandomBytes = () =>
    new Promise<Buffer>((resolve, reject) => {
        randomBytes(16, (error: unknown, buffer: Buffer) => {
            if (error) {
                return reject(error);
            }

            resolve(buffer);
        });
    });

export const getHashSecret = () =>
    createHash('SHA256')
        .update(String(process.env.JWT_SECRET))
        .digest('base64')
        .slice(0, 32);

export const encrypt = async (token: string, secret: string) => {
    const buffer = await getRandomBytes();

    const cipherText = createCipheriv(ALGORITHM, secret, buffer);

    let encrypted = cipherText.update(token, 'utf8', 'binary');
    encrypted += cipherText.final('binary');

    const encryptedBuffer = Buffer.from(encrypted, 'binary');

    const encryptedToken = `${encryptedBuffer.toString(
        'base64'
    )}--${buffer.toString('base64')}`;

    return encryptedToken;
};

export const readToken = (token: string, password: string) => {
    try {
        const parts = token.split(' ')[1].split('--', 2);
        const encrypted = Buffer.from(parts[0], 'base64');
        const buffer = Buffer.from(parts[1], 'base64');
        const decrypt = createDecipheriv(ALGORITHM, password, buffer);
        const decrypted = `${decrypt.update(encrypted)}${decrypt.final()}`;

        return decrypted;
    } catch (error) {
        Logger.error(error);
    }
};

export const generateEncryptedToken = async (user: User) => {
    // payload to be included in the jwt token
    const payload = {
        id: user.id,
        email: user.email,
    };

    const key = getHashSecret();

    const token = jwt.sign(payload, key, {
        expiresIn: String(process.env.JWT_EXPIRES_IN),
    });

    const encryptedToken = await encrypt(token, key);

    const bearerToken = `Bearer ${encryptedToken}`;
    return bearerToken;
};
