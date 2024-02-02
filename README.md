# JWT Auth Service

### Express + TypeScript + Postgres + Password-JWT Boilerplate

This boilerplate project encompasses a range of common requirements for node API development, combining technologies such as Express, TypeScript, PostgreSQL, and Password-JWT. The following features are implemented:

-   **Express Server**: Express server is in place with most of reuqired middlewares.
-   **PostgreSQL Integration**: Seamless integration with a PostgreSQL database.
-   **Authentication and Authorization**: Utilizes JSON Web Tokens (JWT) with password-based authentication.
-   **Session Management** : Common requirements for session handling are already in place.
-   **View Engine**: View engine with EJS is in place for public and private pages with actions.
-   **CRUD Operations**: Routes to handle Create, Read, Update, and Delete operations.
-   **Testing**: Includes setups for unit tests, integration tests, and end-to-end tests.
-   **Documentation**: Features an OpenAPI specification for API documentation.
-   **Swagger UI**: Provides a Swagger UI setup for easy API exploration.
-   **Docker and Docker-Compose**: Docker and Docker-Compose setups for containerization with pm2 for production.
-   **Logging**: Configured Morgan for HTTP logging and Winston for application level logging.

### Usage Scenarios:

-   ### Authentication Service:
    -   Provides API endpoints to handle user authentication + authentication and basic CRUD operations on user which can be extended to fully functioning authentication service.
-   ### Login Portal:
    -   Provides user interfaces for login, registration, and private pages with session management which can be extended to feature rich universal login platorm.

Feel free to use this boilerplate project for kickstarting your web development endeavors.

# Table of contents

-   [Prerequisites](#prerequisites)
-   [Getting started](#getting-started)
    -   [Quick start](#quick-start)
    -   [Dev setup](#dev-setup)
-   [Environment variables](#environment-variables)
-   [Project structure](#project-structure)
-   [Build scripts](#build-scripts)
-   [Debugging](#debugging)
-   [Logging](#logging)
-   [Testing](#testing)
    -   [Integration tests with Supertest](#integration-tests-with-supertest)
    -   [Unit tests with Jest](#unit-tests-with-jest)
    -   [E2E tests with Cypress](#e2e-tests-with-cypress)
-   [Code analysis and Fomatter](#code-analysis-and-fomatter)
    -   [Linting](#linting)
    -   [Formatting](#formatting)
-   [Documentaion](#documentaion)
-   [Dependencies](#dependencies)
    -   [production](#production)
    -   [development](#development)
-   [License](#license)

# Prerequisites

-   Node v18+ [Node.js](https://nodejs.org/en/)

# Getting started

```shell
# Get the latest snapshot
git clone --depth=1 https://github.com/imchamarac/jwt-auth-service.git <project_name>

# Change directory
cd <project_name>

# Copy the .env.example contents into the .env
cat .env.example > .env
```

There are two ways to go about running this project in your dev enviornment.
You can either follow the quick start path where you can use the docker-compose setup or you can setup the development enviornment by following the steps in dev setup.

## Quick start

Ensure you have docker installed on your machine or you can install it from [Docker](https://docs.docker.com/desktop/install/mac-install/).

You can simply run the `docker-compose up` command to build and runs the following required services.

-   **pgadmin** - Database administrator tool
-   **db** - PostgreSQL database
-   **app** - Express server instance

### pgAdmin server setup

Once docker compose is completed building process and starts running you can follow the below setps to setup the pgAdmin tool

-   Go to http://localhost:5050/browser/ in your browser.
-   Use the credentials under the pgadmin service in the docker compose file to login.
-   Once you're logged in, create a new server by right click on the Server -> Register -> Server
    -   **General tab** - provide the server name (any name)
    -   **Connection tab** - provide `db` as the host name/ address and fill password from the docker compose file
-   If you navigate to DB name(jwt_auth_service default) -> Schemas -> Tables -> users table should be available
-   Database is up and running and is ready to accept connections from our application.

### Test database

You can check the database service by running the following commands:

-   `docker exec -ti pg_server /bin/bash` - to start a interactive terminal inside the container.
-   `psql jwt_auth_service admin` - to log into the database with admin role.
-   `\dt` - to list avilable tables.
-   `SELECT * FROM users;` - to list users from the users table.

With that you now have access to your API 🎉 🎉 🎉 🎉

-   ##### Go to http://localhost:8080/login to visit the web application and you can start by registering a new user
-   ##### Go to http://localhost:8080/api/v1/docs/ to check the swagger docs
-   ##### Go to Postman and start sending API requests to listed endpoints in the swagger docs

## DEV setup

If you would like to run this project in dev mode to play around with the codebase, I recommend setting it up using the following steps.

### Setup PostgreSQL server

You can install postgreSQL by running:

`brew install postgresql`

Export the following environment variables from the root:

```
export PGUSER=admin
export PGPASSWORD=password
export PGDATABASE=jwt_auth_service
export PGHOST=localhost
export PGPORT=5432
```

The database schema and seed data is located inside the `db` folder.

Run following command to create database schema:

`psql -f ./db/schema.sql`

(optional) If you are planning to run integration tests:, run the following command to create a test database:

`psql -f ./db/schema-test.sql`

(optional) Run following command to seed the database:

`psql -f ./db/data.sql`

To run the migrations use the following command (after you have installed all packages):

`db-migrate up`

### Setup DBeaver(recommend)

You can skip this step if you already have a configured database admin tool, if not you can download and setup DBeaver to help you to visualize and manage your databases.

Once you created and connected to a server, you can start the application in your local environment

### Start dev server

Before start the dev server install dependencies by ruiing `yarn install`.

Once the installation is completed, you can start the application by ruuning `yarn dev`...

With that you now have access to your API with live reloading 🔥 🔥 🔥 🔥

-   ##### Go to http://localhost:8080/login to visit the web application and you can start by registering a new user
-   ##### Go to http://localhost:8080/api/v1/docs/ to check the swagger docs
-   ##### Go to Postman and start sending API requests to listed endpoints in the swagger docs

Happy coading folks 👨‍💻 👩‍💻

# Environment variables

| Name            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| SESSION_SECRET  | The session secret is used to sign the JWT token                             |
| PGHOST          | posrgres host                                                                |
| PGPORT          | posrgres port                                                                |
| PGUSER          | name of the database                                                         |
| PGPASSWORD      | posrgres user - not used for development, required for production            |
| PGPASSWORD      | posrgres user's password - not used for development, required for production |
| PGDATABASE_TEST | test database for integration tests                                          |
| JWT_EXPIRES_IN  | JWT timeout                                                                  |
| JWT_SECRET      | JWT secrect to use for JWT sign                                              |
| APP_COOKIE_KEY  | JWT cookie key                                                               |

# Project structure

| Name                       | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| **\_\_tests\_\_**          | Contains integration and unit tests files                                   |
| **configs**                | Contains configuration related to middlewares                               |
| **cypress**                | E2E test files                                                              |
| **db**                     | bootstrap data required to stat with the project                            |
| **dist**                   | Contains production ready build                                             |
| **docs**                   | Open API specifications                                                     |
| **migrations**             | Contains schema migration files                                             |
| **node_modules**           | Contains all npm dependencies                                               |
| **src**                    | Contains source code required in traspiling                                 |
| **src/constants**          | Contains all the constants                                                  |
| **src/controllers**        | Contains all route handlers                                                 |
| **src/database**           | Contains database connection related files                                  |
| **src/enum**               | Contains all the enums                                                      |
| **src/middlwares**         | Contains all the middlewares                                                |
| **src/models**             | Contains all database models                                                |
| **src/services**           | Contains all services to handle the business logic                          |
| **src/routes**             | Contains API and VIEW routes                                                |
| **src/utils**              | Contains all util functions used across the project                         |
| **src/validators**         | Contains API request validators                                             |
| **src/server.ts**          | Entry point to the express app                                              |
| **src/swagger.ts**         | Swagger express configs                                                     |
| **views**                  | Contains all ejs based UI views/ pages                                      |
| .dockerignore              | Docker ignore file                                                          |
| .env.example               | Example .env file                                                           |
| .env                       | All the env variables needed to run the app, will be loaded by dotenv       |
| .eslintignore              | Used to provide the list of files to ignore from linting                    |
| .eslintrc.json             | Used to provide eslint configs for linting                                  |
| .gitignore                 | Used to provide the list of files to ignore from pushing to remote repo     |
| .prettierignore            | Used to provide the list of files to ignore from formatting                 |
| .prettierrc.json           | Used to provide prettier formatter configs                                  |
| cypress.config.ts          | Used by cypress to run e2e tests                                            |
| Databse.json               | Used to provide configs for db migration                                    |
| docker-compose.yaml        | Used to build all the services requied to run the application with database |
| Dockerfile                 | Used to build the docker image for the express app                          |
| jest.config.base.ts        | Used to provide common Jest configs running tests written in TypeScript     |
| jest.config.integration.ts | Used to provide Jest configs for integration tests                          |
| jest.config.unit.ts        | Used to provide Jest configs for unit tests                                 |
| package.json               | File that contains npm dependencies as well as build scripts                |
| postgres.dockerfile        | Used to build the docker image for the postgres database                    |
| process.yaml               | PM2 configuration file                                                      |
| tsconfig.json              | Config settings for compiling server code written in TypeScript             |

# Build scripts

[npm scripts](https://docs.npmjs.com/misc/scripts) can be found in `package.json` in the `scripts` section.

| Npm Script         | Description                          |
| ------------------ | ------------------------------------ |
| `dev`              | Starts the local development server  |
| `dev:watch`        | Serve from the dist folder           |
| `build`            | Create a production build            |
| `start`            | Start in production mode             |
| `lint`             | Scan for lint issues                 |
| `lint:fix`         | Scan and fix lint issues             |
| `prettier:fix`     | Scan and fix formatting issues       |
| `test:unit`        | Runs unit tests                      |
| `test:integration` | Runs integration tests               |
| `test:e2e`         | Runs E2E tests for pages and actions |
| `openapi-gen`      | Generates the open API spec          |
| `migrate`          | Runs DB migrate                      |

# Debugging

Follow below steps if you want to run in the debug mode,

-   To start debug mode run `dev:debug` script.
-   Press `Ctrl+Shift+P` and find the Debug: Attach to Node Process command from the command palette of VScode.
-   Now you can add breakpoints and send a request from the browser or from the postman.

# Logging

We're using following libraries to handle application's loggings

-   [Morgan](https://www.npmjs.com/package/morgan) - to log incoming HTTP requests
-   [Winston](https://www.npmjs.com/package/winston) - to log application errors, info, warnings and debugging.

# Testing

This project uses [Jest](https://facebook.github.io/jest/) for unit tests, [Supertest](https://www.npmjs.com/package/supertest) for integration tests and [Cypress](https://www.npmjs.com/package/cypress) for E2E tests the web pages.

## Integration tests with Supertest

We use a separate database to run integration tests so we can keep it clean after each tests.

If you haven't done already, run the following command to create a test database:

`psql -f ./db/schema-test.sql`

After creating the test database, you can run the following script to run integration tests

`test:integration`

## Unit tests with Jest

Run the following command to run unit tests:

`test:units`

## E2E tests with Cypress

Run the following command to run cypress tests:

`test:e2e`

# Code analysis and Fomatter

## Linting

This project is using `ESLint` with `typescript-eslint/recommended` settings for static code analysis.  
Run `lint:fix` to scan and fix(what's fixable) problematic patterns in your code.

## Formatting

This project is using `Prettier` for code formatting.
Run `prettier:fix` to scan and fix formatting issues.

# Documentaion

This project uses openapi 3 specification with swagger express UI to render the documents into `api/v1/docs` route.

Note that I've used two methods(inline and separate folder) to write docs and used jsDOC to switch and load them into the swagger express UI.

Feel free to use only one method that you prefer.

# Dependencies

## production

| Package             | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| bcrypt              | A bcrypt library for NodeJS                                             |
| compression         | Node.js compression middleware                                          |
| cookie-parser       | Middleware to parse HTTP request cookies                                |
| cors                | Express middleware that can be used to enable CORS with various options |
| dotenv              | Loads environment variables from .env file                              |
| ejs                 | Embedded JavaScript templates                                           |
| express             | Node.js web framework                                                   |
| express-ejs-layouts | Layout support for ejs in express                                       |
| express-flash       | Flash Messages for your Express Application                             |
| express-session     | Simple session middleware for Express                                   |
| express-validator   | Express middleware for the validator module and sanitizers              |
| helmet              | Help secure Express/Connect apps with various HTTP headers              |
| jsonwebtoken        | An implementation of JSON Web Tokens                                    |
| morgan              | HTTP request logger middleware                                          |
| passport            | Simple and elegant authentication library for node.js                   |
| passport-jwt        | Sign-in with Username and Password plugin                               |
| pg                  | Non-blocking PostgreSQL client for Node.js                              |
| swagger-jsdoc       | Generates swagger doc based on JSDoc                                    |
| swagger-ui-express  | Swagger UI Express                                                      |
| winston             | Logging library                                                         |

## development

| Package               | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| @types                | Dependencies in this folder are `.d.ts` files used to provide types.    |
| @redocly/cli          | All-in-one OpenAPI utility.                                             |
| cypress               | E2E testing tool for web.                                               |
| db-migrate            | Database migration framework for node.js.                               |
| db-migrate-pg         | A postgresql driver for db-migrate.                                     |
| eslint                | Linter for JavaScript and TypeScript files.                             |
| eslint-plugin-cypress | A postgresql driver for db-migrate.                                     |
| jest                  | Testing library for JavaScript.                                         |
| nodemon               | Utility that automatically restarts node process on code changes.       |
| prettier              | Prettier is an opinionated code formatter                               |
| supertest             | HTTP assertion library.                                                 |
| ts-jest               | A preprocessor with sourcemap support to help use TypeScript with Jest. |
| typescript            | JavaScript compiler/type checker that boosts JavaScript productivity.   |

# License

The MIT License (MIT)

Copyright (c) 2024 Chamara Chathuranga

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
