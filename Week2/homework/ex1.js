import mysql from "mysql";

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

const createTable = (table) => {
    connection.query(table, (err, result) => {
        if (err) {
            throw err
        }
        console.log("Table Created");
    })
};

createTable(`CREATE TABLE IF NOT EXISTS Authors (
    author_id INT,
    author_name VARCHAR(50),
    university TEXT,
    date_of_birth DATETIME,
    h_index INT,
    gender ENUM('Male', 'Female', 'Other'),
    PRIMARY KEY (author_id)
);`)


const inputValues = (value) => {
    connection.query(value, (err, result) => {
        if (err) {
            throw err;
        }
      console.log("value added in Table");
    });
};
  
inputValues(`ALTER TABLE Authors
ADD Mentor INT,
ADD CONSTRAINT fk_mentor FOREIGN KEY (Mentor) REFERENCES researchData.Authors (author_id);`)

inputValues(`
INSERT INTO authors (
    author_id, author_name, university, date_of_birth, h_index, gender, Mentor )
VALUES 
(1, 'Ali', 'Uni of Alpha', '1986-12-08', 10, 'Male', NULL),
(2, 'Boris', 'Uni of Alpha', '1987-12-08', 11, 'Male', 1),
(3, 'Charlie', 'Uni of Alpha', '1988-12-08', 10, 'Male', 2),
(4, 'Don', 'Uni of Bravo', '1989-12-08', 12, 'Male', 3),
(5, 'Eli', 'Uni of Bravo', '1990-12-08', 9, 'Female', 4),
(6, 'Fari', 'Uni of Bravo', '1991-12-08', 13, 'Female', 5),
(7, 'George', 'Uni of Charlie', '1992-12-08', 15, 'Male', 6),
(8, 'Hero', 'Uni of Charlie', '1993-12-08', 14, 'Male', 7),
(9, 'Imi', 'Uni of Charlie', '1994-12-08', 16, 'Female', 8),
(10, 'John', 'Uni of Charlie', '1995-12-08', 17, 'Male', 9),
(11, 'Kris', 'Uni of Delta', '1996-12-08', 18, 'Male', 10),
(12, 'Louie', 'Uni of Delta', '1997-12-08', 19, 'Male', 11),
(13, 'Mary', 'Uni of Delta', '1998-12-08', 20, 'Female', 12),
(14, 'Nancy', 'Uni of Delta', '1999-12-08', 10, 'Female', 13),
(15, 'Ophelia', 'Uni of Delta', '2000-12-08', 15, 'Female', 14)
`);

connection.end();