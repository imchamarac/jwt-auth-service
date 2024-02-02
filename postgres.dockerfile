FROM postgres

COPY db/import.sh /docker-entrypoint-initdb.d/

COPY /db/*.sql /db/



