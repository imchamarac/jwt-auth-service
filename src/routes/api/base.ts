/**
 * @openapi
 *
 * tags:
 *  name: User
 *  description: User enpdpoints
 *
 * components:
 *  schemas:
 *    Success:
 *     type: object
 *     properties:
 *      success:
 *       type: boolean
 *    Error:
 *     type: object
 *     properties:
 *      success:
 *       type: boolean
 *       default: false
 *    Modified:
 *     type: object
 *     properties:
 *      count:
 *       type: integer
 *       example: 1
 *  responses:
 *   Unauthorized:
 *    description: Unauthorized
 *    content:
 *     application/json:
 *      schema:
 *       allOf:
 *        - $ref: '#/components/schemas/Error'
 *        - type: object
 *          properties:
 *            message:
 *             type: string
 *             default: No auth token
 *   NotFound:
 *    description: Data Not Found
 *    content:
 *     application/json:
 *      schema:
 *       allOf:
 *        - $ref: '#/components/schemas/Error'
 *        - type: object
 *          properties:
 *            message:
 *             type: string
 *             default: No record found
 *   ServerError:
 *    description: Internal Server Error
 *    content:
 *     application/json:
 *      schema:
 *       allOf:
 *        - $ref: '#/components/schemas/Error'
 *        - type: object
 *          properties:
 *            message:
 *             type: string
 *             default: Internal server error
 *   UnprocessableEntity:
 *    description: Request Validation Error
 *    content:
 *     application/json:
 *      schema:
 *       allOf:
 *        - $ref: '#/components/schemas/Error'
 *        - type: object
 *          properties:
 *            message:
 *             type: string
 *             default: Validation failed
 *  */
