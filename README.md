# Storefront Backend Project

## Database

Create database using this query: <br />
CREATE DATABASE Storefront_database;

## Project Enviroment

### You Have to change the (POSTGRES_USERNAME, POSTGRES_PASSWORD) parameters

DEFAULT_ENV=dev <br />
POSTGRES_HOST=127.0.0.1 <br />
POSTGRES_USERNAME=postgres <br />
POSTGRES_PASSWORD=moznh111 <br />
POSTGRES_DB=storefront_database <br />

POSTGRES_TEST_DB=storefront_database_test <br />
BCRYPTPASSWORD = strong-secret-password <br />
SLART_ROUNDS=10 <br />
TOKENSECRET = strong-secret-token <br />

### In database.json file, Change the username, password parameters

{<br />
"defaultENV": {<br />
"ENV": "DEFAULT_ENV" <br />
}, <br />
"dev": { <br />
"driver": "pg",
"user": { "ENV": "POSTGRES_USERNAME" }, <br />
"password": { "ENV": "POSTGRES_PASSWORD" }, <br />
"host": { "ENV": "POSTGRES_HOST" }, <br />
"database": { "ENV": "POSTGRES_DB" } <br />
}, <br />
"test": { <br />
"driver": "pg", <br />
"user": { "ENV": "POSTGRES_USERNAME" }, <br />
"password": { "ENV": "POSTGRES_PASSWORD" }, <br />
"host": { "ENV": "POSTGRES_HOST" }, <br />
"database": { "ENV": "POSTGRES_TEST_DB" }<br />
} <br />
}

## Creating Database tables

npm run migrate-up

## Getting Started

To install project dependencies, use this command <br />
npm install

## Running The Server

npm run build <br />
npm run start

## Formatting

npm run prettier

## Linting

npm run lint

## Test the App

### Create Database for testing

CREATE DATABASE storefront_database_test;

### Run Test Script

npm run test:windows
