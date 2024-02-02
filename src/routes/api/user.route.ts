import express from 'express';

import { apiAuthenticated } from '../../middlewares/auth.middleware';
import { userController } from '../../controllers';
import { userValidator } from '../../validators';
import { validationErrorHandler } from '../../middlewares';

const router = express.Router();

/**
 *
 * @openapi
 *
 * components:
 *  schemas:
 *   LoginUser:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: User email.
 *      example: chamara@gmail.com
 *     password:
 *      type: string
 *      description: User password.
 *      example: password
 *   EditUser:
 *    type: object
 *    properties:
 *     first_name:
 *      type: string
 *      description: User first name.
 *      example: Chamara
 *     last_name:
 *      type: string
 *      description: Userlast name.
 *      example: Chathuranga
 *     role:
 *      type: number
 *      description: User role.
 *      example: Chathuranga
 *   NewUser:
 *    allOf:
 *     - type: object
 *     - $ref: '#/components/schemas/EditUser'
 *     - $ref: '#/components/schemas/LoginUser'
 *   User:
 *    allOf:
 *     - type: object
 *       properties:
 *        id:
 *         type: integer
 *         description: User ID.
 *         example: 1
 *        created_at:
 *         type: integer
 *         description: Date account created.
 *         example: 0
 *        updated_at:
 *         type: integer
 *         description: Date account last updated.
 *         example: 0
 *     - $ref: '#/components/schemas/NewUser'
 */

/**
 *
 * @openapi
 *
 * /user/{id}:
 *  get:
 *   summary: Get user by ID
 *   description: Use to retrieve the user by user ID
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: integer
 *       example: 1
 *   responses:
 *    200:
 *     description: OK.
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/Success'
 *         - type: object
 *           properties:
 *            message:
 *             type: string
 *             example: Record found
 *            user:
 *             $ref: '#/components/schemas/User'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    500:
 *     $ref: '#/components/responses/ServerError'
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *
 *  put:
 *   summary: Update user by ID
 *   description: Use to update user names by user ID.
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       - $ref: '#/components/schemas/EditUser'
 *   responses:
 *    200:
 *     description: OK.
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/Success'
 *         - $ref: '#/components/schemas/Modified'
 *         - type: object
 *           properties:
 *            message:
 *             type: string
 *             example: Record updated successfully
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    500:
 *     $ref: '#/components/responses/ServerError'
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *
 *  delete:
 *   summary: Delete user by ID
 *   description: Use to delete an user by user ID.
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: OK.
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/Success'
 *         - $ref: '#/components/schemas/Modified'
 *         - type: object
 *           properties:
 *            message:
 *             type: string
 *             example: Record deleted successfully
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    500:
 *     $ref: '#/components/responses/ServerError'
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 */
router
    .route('/:id([0-9]+)')
    .get(apiAuthenticated, userController.getUserById)
    .put(
        apiAuthenticated,
        userValidator.updateValidator,
        validationErrorHandler,
        userController.updateUserById
    )
    .delete(apiAuthenticated, userController.deleteUser);

/**
 *
 * @openapi
 *
 * /user/list:
 *  get:
 *   summary: Get users list
 *   description: Use to fetch all users
 *   responses:
 *    200:
 *     description: OK.
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/Success'
 *         - type: object
 *           properties:
 *            message:
 *             type: string
 *             example: Data fetch successful
 *            users:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/User'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 *    500:
 *     $ref: '#/components/responses/ServerError'
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 */
router.route('/list').get(apiAuthenticated, userController.listAllUsers);

export default router;
