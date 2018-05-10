-- Create the burgers_db.
CREATE DATABASE baby_tracker;
-- Switch to or use the burgers_db.
USE baby_tracker;
-- Create a burgers table with these fields:
-- id: an auto incrementing int that serves as the primary key.
-- burger_name: a string.
-- devoured: a boolean.
CREATE TABLE burgers (
    id SERIAL PRIMARY KEY, 
    burger_name VARCHAR(20) NOT NULL, 
    devoured BOOLEAN DEFAULT FALSE NOT NULL
);