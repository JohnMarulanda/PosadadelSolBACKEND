CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(40),
    lastName VARCHAR(40),
    email TEXT
);

INSERT INTO users (firstName, lastName, email) VALUES 
    ('John', 'Marulanda', 'John@gmail.com'),
    ('Diego', 'Marulanda', 'ryan@gmail.com');

