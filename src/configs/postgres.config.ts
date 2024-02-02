type ConfigProps = {
    host?: string;
    user?: string;
    port?: number;
    password?: string;
    database?: string;
    connectTimeout: number;
};

type DBConfig = {
    develop: ConfigProps;
    test: ConfigProps;
};

export const dbConfig: DBConfig = {
    develop: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        port: Number(process.env.PGPORT),
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        connectTimeout: Number(60000),
    },
    test: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        port: Number(process.env.PGPORT),
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE_TEST,
        connectTimeout: Number(60000),
    },
};
