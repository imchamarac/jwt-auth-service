import { userModel } from '../models';
import { User } from '../models/pg/users.model';

const createUser = async (user: Partial<User>) => {
    return await userModel.createUser(user);
};

const getUserById = async (id: number) => {
    return await userModel.selectUserById(id);
};

const getUserByEmail = async (email: string) => {
    return await userModel.selectUserByEmail(email);
};

const listAllUsers = async () => {
    return await userModel.getAllUsers();
};

const updateUserById = async (id: number, user: Partial<User>) => {
    return await userModel.updateUserById(id, user);
};

const deleteUserById = async (id: number) => {
    return await userModel.deleteUserById(id);
};

export {
    createUser,
    getUserById,
    getUserByEmail,
    listAllUsers,
    updateUserById,
    deleteUserById,
};
