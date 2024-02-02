import request from 'supertest';
import bcrypt from 'bcrypt';
import * as services from '../../src/services';
import { handleRoute } from '../utils/handleRoute';
import app from '../../src/server';
import { HttpStatusCode, ROUTES } from '../../src/enum';

jest.mock('../../src/services');

const mockedUseFooContext = services.userService
    .getUserByEmail as jest.Mock<any>;
const mockedCreateNewUser = services.userService.createUser as jest.Mock<any>;

const email = 'chamara@gmail.com';
const password = 'testpwd';
const first_name = 'Chamara';
const last_name = 'Chathuranga';
const role = 1;

const userObj = {
    id: 1,
    first_name,
    last_name,
    email,
    role,
};

const loginRoute = handleRoute(ROUTES.USER_LOGIN, 'auth');
const registerRoute = handleRoute(ROUTES.USER_REGISTRATION, 'auth');

const sentLoginRequest = async (params = {}) =>
    await request(app).post(loginRoute).send(params);

const sentRegisterRequest = async (params = {}) =>
    await request(app).post(registerRoute).send(params);

describe(`UNIT - Auth ROUTES`, () => {
    describe(`POST ${loginRoute}`, () => {
        describe('Input validation tests', () => {
            it('Empty email and password validation tests', async () => {
                const res = await sentLoginRequest();

                expect(res.statusCode).toEqual(
                    HttpStatusCode.UNPROCESSABLE_ENTITY
                );

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);
                expect(parsedRes.message.email).toEqual(
                    'Email cannot be empty'
                );
                expect(parsedRes.message.password).toEqual(
                    'Password cannot be empty'
                );
            });

            it('Empty email validation tests', async () => {
                const res = await sentLoginRequest({
                    password: 'simplepassword',
                });
                expect(res.statusCode).toEqual(
                    HttpStatusCode.UNPROCESSABLE_ENTITY
                );

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);
                expect(parsedRes.message.email).toEqual(
                    'Email cannot be empty'
                );
            });

            it('Empty password credential validation tests', async () => {
                const res = await sentLoginRequest({
                    email: 'chamara@gmail.com',
                });
                expect(res.statusCode).toEqual(
                    HttpStatusCode.UNPROCESSABLE_ENTITY
                );

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);
                expect(parsedRes.message.password).toEqual(
                    'Password cannot be empty'
                );
            });
        });

        describe('Controller tests', () => {
            it('Invalid password tests', async () => {
                const hashedPassword = await bcrypt.hash(password, 10);

                mockedUseFooContext.mockResolvedValueOnce({
                    ...userObj,
                    password: hashedPassword,
                });

                const res = await sentLoginRequest({
                    email,
                    password: 'testpwd1',
                });

                expect(res.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);
                expect(parsedRes.message).toEqual(
                    'Incorrect email or password, please check again!'
                );
            });

            it('Invalid email tests', async () => {
                mockedUseFooContext.mockResolvedValueOnce(null);

                const res = await sentLoginRequest({
                    email,
                    password,
                });

                expect(res.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);
                expect(parsedRes.message).toEqual(
                    'Incorrect email or password, please check again!'
                );
            });

            it('Valid user credentials tests', async () => {
                const hashedPassword = await bcrypt.hash(password, 10);

                mockedUseFooContext.mockResolvedValueOnce({
                    ...userObj,
                    password: hashedPassword,
                });

                const res = await sentLoginRequest({
                    email,
                    password,
                });

                expect(res.statusCode).toEqual(HttpStatusCode.OK);

                const { success, message, token } = JSON.parse(res.text);
                expect(success).toEqual(true);
                expect(message).toEqual('Login successful');
                expect(token).toBeDefined();
            });
        });
    });

    describe(`POST ${registerRoute}`, () => {
        describe('Input validation tests', () => {
            it('Empty inputs validation tests', async () => {
                const res = await sentRegisterRequest();
                expect(res.statusCode).toEqual(
                    HttpStatusCode.UNPROCESSABLE_ENTITY
                );

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);

                expect(parsedRes.message.email).toEqual(
                    'Email cannot be empty'
                );
                expect(parsedRes.message.first_name).toEqual(
                    'First name cannot be empty'
                );
                expect(parsedRes.message.last_name).toEqual(
                    'Last name cannot be empty'
                );
                expect(parsedRes.message.password).toEqual(
                    'Password cannot be empty'
                );
            });

            it('Invalid email format validation tests', async () => {
                const res = await sentRegisterRequest({ email: 'test@abc' });
                expect(res.statusCode).toEqual(
                    HttpStatusCode.UNPROCESSABLE_ENTITY
                );

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);

                expect(parsedRes.message.email).toEqual('Invalid email format');
            });

            it('Invalid password length validation tests', async () => {
                const res = await sentRegisterRequest({
                    email,
                    first_name,
                    last_name,
                    password: 'abc',
                    role,
                });
                expect(res.statusCode).toEqual(
                    HttpStatusCode.UNPROCESSABLE_ENTITY
                );

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);

                expect(parsedRes.message.password).toEqual(
                    'Minimum password length is 6 characters'
                );
            });
        });

        describe('Controller tests', () => {
            it('Existing user check tests', async () => {
                mockedUseFooContext.mockResolvedValueOnce({
                    email,
                    first_name,
                    last_name,
                    password: password,
                });

                const res = await sentRegisterRequest({
                    email,
                    first_name,
                    last_name,
                    password: password,
                    role,
                });
                expect(res.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(false);
                expect(parsedRes.message).toEqual(
                    'User with email already exists!'
                );
            });

            it('User registration success tests', async () => {
                mockedUseFooContext.mockResolvedValueOnce(null);
                mockedCreateNewUser.mockResolvedValueOnce({
                    email,
                    first_name,
                    last_name,
                    password: password,
                });

                const res = await sentRegisterRequest({
                    email,
                    first_name,
                    last_name,
                    password: password,
                    role,
                });
                expect(res.statusCode).toEqual(HttpStatusCode.OK);

                const parsedRes = JSON.parse(res.text);
                expect(parsedRes.success).toEqual(true);
                expect(parsedRes.message).toEqual('User created successfully');
            });
        });
    });
});
