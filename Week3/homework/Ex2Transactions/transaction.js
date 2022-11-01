import mysql from "mysql";
import {    TABLES          } from "./transactions-create-tables.js";
import {    INSERT_DATA     } from "./transactions-insert-values.js";
import {    transactionQueries     } from "./transactionQueries.js";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connection Established!");
});


await singleQuery("DROP DATABASE IF EXISTS AccountTransactions;");
await singleQuery("CREATE DATABASE IF NOT EXISTS AccountTransactions;");
await singleQuery("USE AccountTransactions;");


async function singleQuery (query) {
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`${query} Done!`);
    })
};

async function implementQuery(array) {
    array.forEach(element => {
        connection.query(element.query, (err, result) => {
            if (err) throw err;
            console.log(`${element.title}`);
        });
    });
}



try {
    await implementQuery(TABLES);
    await implementQuery(INSERT_DATA);
    connection.beginTransaction();
    await implementQuery(transactionQueries);
    connection.commit();
    connection.end();
} catch (error) {
    console.error(error);
    connection.rollback();
}