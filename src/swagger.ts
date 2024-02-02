import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.1.0',
        basePath: `${process.env.API_HOST}/${process.env.API_PORT}`,
        servers: [{ url: '/api/v1' }],
        info: {
            title: 'JWT Auth Service',
            version: '1.0.0',
            description:
                '[Express + TypeScript + Postgres + Password-JWT] boilerplate which encompasses a range of common requirements for web development, combining technologies such as Express, TypeScript, PostgreSQL, and Password-JWT ',
        },
    },
    apis: [`${__dirname}/docs/openapi.*`],
    // apis: [`${__dirname}/routes/api/*.ts`],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
