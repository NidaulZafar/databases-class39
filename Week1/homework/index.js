import mysql from "mysql";
import { tables, tableValue } from "./data.js";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});



connection.connect((err) => {
    if (err) throw err;
    console.log("Connection Established!");
});


connection.query("CREATE DATABASE IF NOT EXISTS meetup", (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Database titled 'Meetup' Created");
})

const createTable = (table) => {
    connection.query(table, (err, result) => {
        if (err) {
            throw err
        }
        console.log("Table Created");
    })
};

const inputValues = (value) => {
    connection.query(value, (err, result) => {
        if (err) {
            throw err;
        }
      console.log("value added in Table");
    });
};
  

tables.forEach(table => createTable(table));
tableValue.forEach(value => inputValues(value));

const dropTable = () => {
    connection.query(`DROP TABLE Invitee, Room, Meeting`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Tables Dropped");
    });
};
dropTable();

connection.end();