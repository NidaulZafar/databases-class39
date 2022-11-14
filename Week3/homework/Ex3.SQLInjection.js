const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hackmyfuture",
});
conn.connect();
conn.query(`USE world;`);
const showData = (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(results);
    }
};
  

const inputCountryName = "'Abc' OR 1=1";
const inputCountryCode = "'NED' OR 1=1";
// Example of SQL injection
conn.query(
    `SELECT Population FROM country WHERE Name = ${inputCountryName}  and code = ${inputCountryCode}`,
    showData
  );


// Fixed code

function getPopulation(Country, name, code, cb) {
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
}

conn.end();