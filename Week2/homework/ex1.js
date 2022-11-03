import mysql from "mysql";
import {createTable} from "./functions.js";
import {inputValues} from "./functions.js";


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'researchData'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connection Established!");
});

connection.query("CREATE DATABASE IF NOT EXISTS researchData", (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Database titled 'researchData' Created");
})


createTable(`CREATE TABLE IF NOT EXISTS Authors (
    author_id INT AUTO_INCREMENT,
    author_name VARCHAR(50),
    university VARCHAR(150),
    date_of_birth DATETIME,
    h_index INT,
    gender ENUM('Male', 'Female', 'Other'),
    PRIMARY KEY (author_id)
);`)

inputValues(`ALTER TABLE Authors
ADD Mentor INT,
ADD CONSTRAINT fk_mentor FOREIGN KEY (Mentor) REFERENCES researchData.Authors (author_id);`)

inputValues('SET foreign_key_checks = 0;');
inputValues(`
INSERT INTO authors (
    author_name, university, date_of_birth, h_index, gender, Mentor )
    VALUES 
    ('Ali', 'Uni of Alpha', '1986-12-08', 10, 'Male', 6),
    ('Boris', 'Uni of Alpha', '1987-12-08', 11, 'Male', 1),
    ('Charlie', 'Uni of Alpha', '1988-12-08', 10, 'Male', 2),
    ('Don', 'Uni of Bravo', '1989-12-08', 12, 'Male', 3),
    ('Eli', 'Uni of Bravo', '1990-12-08', 9, 'Female', 4),
    ('Fari', 'Uni of Bravo', '1991-12-08', 13, 'Female', 5),
    ('George', 'Uni of Charlie', '1992-12-08', 15, 'Male', 6),
    ('Hero', 'Uni of Charlie', '1993-12-08', 14, 'Male', 7),
    ('Imi', 'Uni of Charlie', '1994-12-08', 16, 'Female', 8),
    ('John', 'Uni of Charlie', '1995-12-08', 17, 'Male', 9),
    ('Kris', 'Uni of Delta', '1996-12-08', 18, 'Male', 10),
    ('Louie', 'Uni of Delta', '1997-12-08', 19, 'Male', 11),
    ('Mary', 'Uni of Delta', '1998-12-08', 20, 'Female', 12),
    ('Nancy', 'Uni of Delta', '1999-12-08', 10, 'Female', 13),
    ('Ophelia', 'Uni of Delta', '2000-12-08', 15, 'Female', 14)
    `);
    
inputValues('SET foreign_key_checks = 1;');

connection.end();