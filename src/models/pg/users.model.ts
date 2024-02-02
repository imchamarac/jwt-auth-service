import pgCon from '../../database/postgres';

export enum UserRole {
    SUPER_ADMIN = 1,
    ADMIN,
    USER,
}
export const adminRoles = [UserRole.SUPER_ADMIN, UserRole.ADMIN];
export const userRoles = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER];

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    role: UserRole;
};

const createUser = async (user: Partial<User>): Promise<number> => {
    const { first_name, last_name, email, password, role } = user;

    const query = 'SELECT * FROM insert_user(TRIM($1), TRIM($2), $3, $4, $5)';

    const result = await pgCon.query(query, [
        first_name,
        last_name,
        email,
        password,
        role,
    ]);
    return result?.rows[0].insert_user;
};

const selectUserById = async (id: number): Promise<User> => {
    const query = 'SELECT * FROM users WHERE id=$1';

    const result = await pgCon.query(query, [id]);
    return result?.rows[0];
};

const selectUserByEmail = async (email: string): Promise<User> => {
    const query = 'SELECT * FROM users WHERE email=$1';

    const result = await pgCon.query(query, [email]);
    return result?.rows[0];
};

const getAllUsers = async (): Promise<User[]> => {
    const query = 'SELECT * FROM users';

    const result = await pgCon.query(query);
    return result?.rows;
};

const updateUserById = async (
    id: number,
    user: Partial<User>
): Promise<number | null> => {
    const { first_name, last_name } = user;

    const query =
        'UPDATE users SET first_name=$2,last_name=$3, updated_at=$4 WHERE id=$1';

    const result = await pgCon.query(query, [
        id,
        first_name,
        last_name,
        new Date(),
    ]);
    return result?.rowCount;
};

const deleteUserById = async (id: number): Promise<number | null> => {
    const query = 'DELETE FROM users WHERE id=$1';

    const result = await pgCon.query(query, [id]);
    return result.rowCount;
};

export {
    createUser,
    selectUserById,
    selectUserByEmail,
    getAllUsers,
    updateUserById,
    deleteUserById,
};
