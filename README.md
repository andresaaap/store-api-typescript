# Storefront Backend Project


# Project Title

A brief description of what this project does and who it's for

## Pre-requisites

- Docker. [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose. [Install Docker Compose](https://docs.docker.com/compose/install/)
- Node. [Install Node](https://nodejs.org/en/download/)
- db-migrate. Install the global package `npm install -g db-migrate`



## Run Locally

Clone the project

```bash
  https://github.com/andresaaap/store-api-typescript
```

Go to the project directory

```bash
  cd <project-directory>
```

Install dependencies

```bash
  npm install
```

Start the database using docker-compose

```bash
  docker-compose up -d
```

Make sure that you installed db-migrate globally. If not, run the following command

```bash
  npm install -g db-migrate
```

Run the migrations

```bash
  db-migrate up -e dev
```
It is possible that you need to run the command serveral times until all of the tables are created.


Build the project

```bash
  npm run build
```

Run project

```bash
  npm run start
```


## Tech Stack

**Server:** Node, Express, jsonwebtoken, bcrypt, jasmine, jsonwebtoken, supertest


## Running Tests

Start the database using docker-compose

```bash
  docker-compose up -d
```

Make sure that you installed db-migrate globally. If not, run the following command

```bash
  npm install -g db-migrate
``` 

Make sure that the postgres-test database doesn't exist. If it does, drop it.

```bash
  db-migrate db:drop postgres_test
```

To run tests, run the following command

```bash
  npm run test
```


## Usage/Examples

The following demo shows how to use the API and run the tests

[Demo 🎥](youtube.com)

