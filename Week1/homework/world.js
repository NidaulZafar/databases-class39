import mysql from "mysql";
import { worldQueries } from "./data.js";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connection Established!");
});

const queryResponse = (query) => {
    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
    })
}

worldQueries.forEach(query => queryResponse(query));
