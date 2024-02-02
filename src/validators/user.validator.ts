import { param, body } from 'express-validator';

export const updateValidator = [
    param('id', 'User ID cannot be empty').not().isEmpty().trim(),
    body('first_name', 'First name cannot be empty').not().isEmpty().trim(),
    body('last_name', 'Last name cannot be empty').not().isEmpty().trim(),
];
