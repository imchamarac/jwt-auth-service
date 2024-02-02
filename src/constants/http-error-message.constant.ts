import { HttpStatusCode } from '../enum/http-status-code.enum';

export const httpErrorMessage = {
    [HttpStatusCode.OK]: 'Success',
    [HttpStatusCode.CREATED]: 'New resource created',
    [HttpStatusCode.BAD_REQUEST]: 'Bad request',
    [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized',
    [HttpStatusCode.FORBIDDEN]: 'Forbidden',
    [HttpStatusCode.NOT_FOUND]: 'Not found',
    [HttpStatusCode.INTERNAL_SERVER]: 'Internal server error',
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: 'Validation failed',
};
