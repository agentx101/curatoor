# curatoor
A platform for NFT curators to maintain independent collections

# Requirements
You must to have docker installed on your system to be able to curatoor

# Installing

## Clone this repository

1. cd into the cloned folder 
2. RUN: `docker compose build`
3. RUN: `docker compose up -d`

The application should now be available at localhost:5174

Some Housekeeping:

You will have to create two tables you rcopy of the the database.

1. docker exec -it webdb psql -U ethglobal
2. ```
CREATE TABLE IF NOT EXISTS users (
             id serial PRIMARY KEY,
             address VARCHAR(50) NOT NULL UNIQUE
         )

```
3. ```
CREATE TABLE IF NOT EXISTS collections (
             id serial PRIMARY KEY,
             address VARCHAR(50) NOT NULL UNIQUE,
             user_id INT NOT NULL,
             image_url Varchar(255),
             name Varchar(255),
             description Text
         )
```

It would be best to add a few dummy values to the database manually to see the application flow
