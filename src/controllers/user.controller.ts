import { type Request, type Response } from 'express';

import { userService } from '../services';
import { tryCatch } from '../utils/try-catch-hof';
import { HttpStatusCode } from '../enum/http-status-code.enum';

const getUserById = tryCatch(async (req: Request, res: Response) => {
    const response = await userService.getUserById(+req.params.id);

    if (response) {
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: 'Record found',
            user: response,
        });
    } else {
        res.status(HttpStatusCode.NOT_FOUND).json({
            success: false,
            message: 'Record not found',
        });
    }
});

const listAllUsers = tryCatch(async (req: Request, res: Response) => {
    const response = await userService.listAllUsers();

    res.status(HttpStatusCode.OK).json({
        success: true,
        message: 'Data fetch successful',
        users: response,
    });
});

const updateUserById = tryCatch(async (req: Request, res: Response) => {
    const { first_name, last_name } = req.body;

    const response = await userService.updateUserById(+req.params.id, {
        first_name,
        last_name,
    });

    if (response === 0) {
        res.status(HttpStatusCode.NOT_FOUND).json({
            success: false,
            message: 'No record found',
        });
    } else {
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: 'Record updated successfully',
            count: response,
        });
    }
});

const deleteUser = tryCatch(async (req: Request, res: Response) => {
    const response = await userService.deleteUserById(+req.params.id);

    if (response === 0) {
        res.status(HttpStatusCode.NOT_FOUND).json({
            success: false,
            message: 'No record found',
        });
    } else {
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: 'Record deleted successfully',
            count: response,
        });
    }
});

export { getUserById, listAllUsers, updateUserById, deleteUser };
