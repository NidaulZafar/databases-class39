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

connection.end();