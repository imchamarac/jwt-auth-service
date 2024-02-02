import express, { NextFunction } from 'express';
import { type Request, type Response } from 'express';

import { authController } from '../../controllers';
import { authValidator } from '../../validators';
import { ROUTES } from '../../enum';
import { validationErrorHandler } from '../../middlewares';

const router = express.Router();

/**
 * @openapi
 *
 * tags:
 *  name: Auth
 *  description: Authentication endpoints.
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: Bearer
 *    bearerFormat: JWT
 * security:
 *  - bearerAuth: []
 */

/**
 * @openapi
 *
 * /auth/login:
 *  post:
 *   summary: User authentication
 *   description: Use to login a valid user and issue a JWT token.
 *   tags: [Auth]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/LoginUser'
 *   responses:
 *    200:
 *     description: OK.
 *    400:
 *     description: Bad request.
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    422:
 *     $ref: '#/components/responses/UnprocessableEntity'
 *    500:
 *     $ref: '#/components/responses/ServerError'
 */
router
    .route(ROUTES.USER_LOGIN)
    .post(
        authValidator.loginValidator,
        validationErrorHandler,
        authController.handleLogin
    );

/**
 *
 * @openapi
 *
 * /auth/register:
 *  post:
 *   summary: User authentication
 *   description: Use to register a new user.
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/NewUser'
 *   responses:
 *    200:
 *     description: OK.
 *    400:
 *     description: Bad request.
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    422:
 *     $ref: '#/components/responses/UnprocessableEntity'
 *    500:
 *     $ref: '#/components/responses/ServerError'
 *   tags: [Auth]
 */
router
    .route(ROUTES.USER_REGISTRATION)
    .post(
        authValidator.registerValidator,
        validationErrorHandler,
        authController.handleRegister
    );

/**
 *
 * @openapi
 *
 * /auth/register:
 *  post:
 *   summary: User authentication
 *   description: Use to register a new user.
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/NewUser'
 *   responses:
 *    200:
 *     description: OK.
 *    500:
 *     $ref: '#/components/responses/ServerError'
 *   tags: [Auth]
 */
router
    .route(ROUTES.USER_LOGOUT)
    .post((req: Request, res: Response, next: NextFunction) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect(ROUTES.USER_LOGIN);
        });
    });

export default router;
