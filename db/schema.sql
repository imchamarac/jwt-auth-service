CREATE USER admin SUPERUSER;
DROP DATABASE IF EXISTS jwt_auth_service;
CREATE DATABASE jwt_auth_service;

\c jwt_auth_service;

CREATE EXTENSION citext;
CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id                              SERIAL PRIMARY KEY,
    first_name                      TEXT,
    last_name                       TEXT,
    email                           TEXT,
    password                        TEXT,
    role                            INT,
    created_at                      TIMESTAMP DEFAULT NOW(),
    updated_at                      TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION insert_user(
    IN first_name TEXT,
    IN last_name TEXT,
    IN email TEXT,
    IN password TEXT,
    IN role INT
)
RETURNS setof integer 
AS $$
BEGIN
	return query
	INSERT INTO users (first_name, last_name, email, password, role, created_at, updated_at)
	VALUES (first_name, last_name, email, crypt(password, gen_salt('bf', 10)), role, NOW(), NOW())
	RETURNING id;
END;
$$ language plpgsql;