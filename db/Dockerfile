FROM postgres:9.5

ENV POSTGRES_USER hello
ENV POSTGRES_PASSWORD coffee

ADD setup.sql /docker-entrypoint-initdb.d
