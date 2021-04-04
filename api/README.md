# Grupo A API

## How to run the project

1. Clone the repository on your machine and go to `./api`.
2. Run `docker run --name postgresql -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres` to start a PostgreSQL container
if you don`t have it installed.
3. Rename the `.env.example` to `.env` and change the values of the environment variables.
4. Run `yarn install` to download the dependencies
5. Run `yarn dev` to run it in development mode or `yarn build` and `yarn start` to compile and run it in production
mode.
