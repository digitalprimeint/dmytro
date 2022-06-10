FROM mysql:oracle

COPY ./dump.sql /docker-entrypoint-initdb.d/dump.sql
CMD ["--default-authentication-plugin=mysql_native_password"]