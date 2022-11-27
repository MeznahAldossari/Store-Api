CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username  VARCHAR(100)  UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL

);