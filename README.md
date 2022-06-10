### INSTRUCTION

#### 1- REQUIREMENTS

In order to run this project, you must have installed:

- docker
- docker-compose

Just download from Windows & Mac OS the Docker Desktop Application.

#### 2- SETTINGS

##### GRAPHQL API
The graphql API project requires a .env file with the following variables.

- DATABASE_NAME=
- DATABASE_USER=
- DATABASE_PASSWORD=
- DATABASE_HOST=
- DATABASE_PORT=

or you can assign those env variables using docker-compose or export VARIABLE_NAME=value before the docker-compose up command.

Notes: A default .env file is added and configured using the private docker network.

#### 3- RUN

This is a docker-compose micro services eco system. To run the project use the following command:

`docker-compose up -d`

CONTAINERS

- graphql
- proxy
- gateway
- db

#### 4- RESTRICTIONS

This docker-compose ecosystem does not open the public access to:

- db (MySQL)
- graphql (Apollo Server GraphQL)
- api_gateway (ExpressJS)

Just the proxy has the port 80 open for public access

#### 5- AUTHORIZATION

The token implemented is a base64 string encripting the value:

`user:password`

default values added to the docker-compose proxy service. The current encoded toke is: Z3JhcGhxbDpkZW1vcGFzc3dvcmQyMDIy.

You can include the token in the request throught the headers or in the body:

- Headers Authorization=Bearer Z3JhcGhxbDpkZW1vcGFzc3dvcmQyMDIy
- { "_authorization": "Z3JhcGhxbDpkZW1vcGFzc3dvcmQyMDIy" }

#### 6- COUNTRY RESTRICTION

Running the docker-compose in localhost, the public ip address is not collected from the headers and this feature is disabled with 
the env variable IP_DOCKER=VALID.

In Google Cloud the remote IP address is collected and the country validation is executed. You can control the country codes using the
env variable: COUNTRY_CODES=PA,CA

This module is also returning in the headers the current country accepted.

`req.headers["Proxy-Country"]`

#### 7- RATE LIMIT

It is hardcoded to 10 request by minute.
