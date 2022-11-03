import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'researchData'
});


export const createTable = (table) => {
    connection.query(table, (err, result) => {
        if (err) {
            throw err
        }
        console.log("Table Created");
    })
};


export const inputValues = (value) => {
    connection.query(value, (err, result) => {
        if (err) {
            throw err;
        }
      console.log("value added in Table");
    });
};



