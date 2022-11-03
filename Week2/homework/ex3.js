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


connection.query("CREATE TABLE Authors_and_Mentors SELECT authors.author_id, authors.author_name, Mentor.author_name AS Mentors FROM authors LEFT JOIN authors Mentor ON authors.Mentor = Mentor.author_id;", (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Table of Authors and their Mentors created")
})
connection.query(`CREATE TABLE Authors_and_Papers SELECT authors.*, research_Papers.paper_title 
FROM publish_records
JOIN authors 
ON publish_records.author_id = authors.author_id
JOIN  research_Papers 
ON  research_Papers.paper_id = publish_records.paper_id;`, (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Table of Authors and their Papers created.")
})


connection.end();