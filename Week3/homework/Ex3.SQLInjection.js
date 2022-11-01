const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "world"
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
  
// Example of SQL injection
conn.query(
    `SELECT Population FROM country WHERE Name ='Abc' OR 1=1  and code = 'Abc' OR 1=1`,
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