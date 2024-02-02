#!/bin/sh

psql -U admin jwt_auth_service < /db/schema.sql

# sleep 1

# psql -U admin jwt_accounts < /db/data.sql
 