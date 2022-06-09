### INSTRUCTION

#### REQUIREMENTS

In order to run this project, you must have installed:

- docker
- docker-compose

Just download from Windows & Mac OS the Docker Desktop Application.

#### SETTINGS

The graphql API project requires a .env file with the following variables.

- DATABASE_NAME=
- DATABASE_USER=
- DATABASE_PASSWORD=
- DATABASE_HOST=
- DATABASE_PORT=

or you can assign those env variables using docker-compose or export VARIABLE_NAME=value before the docker-compose up command.

#### RUN

This is a docker-compose micro services eco system. To run the project use the following command:

`docker-compose up -d`

#### RESTRICTIONS

This docker-compose ecosystem does not open the public access to:

- db (MySQL)
- graphql (Apollo Server GraphQL)
- api_gateway (ExpressJS)

Just the proxy has the port 80 open for public access