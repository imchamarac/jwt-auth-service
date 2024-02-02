import request from 'supertest';
import app from '../../src/server';
import { userService } from '../../src/services';
import { handleRoute } from '../utils/handleRoute';
import { HttpStatusCode } from '../../src/enum/http-status-code.enum';
import { pgCon } from '../../src/database';
import { ROUTES } from '../../src/enum';

const userId = 1;

const userObj = {
    first_name: 'Chamara',
    last_name: 'Chathuranga',
    email: 'chamara_test@gmail.com',
    password: 'testpwd',
    role: 3,
};

const loginRoute = handleRoute(ROUTES.USER_LOGIN, 'auth');
const registerRoute = handleRoute(ROUTES.USER_REGISTRATION, 'auth');

beforeAll(() => {
    userService.deleteUserById(userId);
});

describe('INTEGRATION - auth ROUTES', () => {
    it(`POST ${registerRoute}`, async () => {
        const res = await request(app).post(registerRoute).send(userObj);

        expect(res.statusCode).toEqual(HttpStatusCode.OK);

        const { success, message } = JSON.parse(res.text);
        expect(success).toEqual(true);
        expect(message).toEqual('User created successfully');
    });

    it(`POST ${loginRoute}`, async () => {
        const res = await request(app)
            .post(loginRoute)
            .send({ email: userObj.email, password: userObj.password });

        expect(res.statusCode).toEqual(HttpStatusCode.OK);

        const { success, message, token } = JSON.parse(res.text);
        expect(success).toEqual(true);
        expect(message).toEqual('Login successful');
        expect(token).toBeDefined();
    });
});

afterAll(() => {
    userService.deleteUserById(userId);
    pgCon.end();
});
