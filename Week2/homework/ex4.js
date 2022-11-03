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

const values = [
    `SELECT research_papers.paper_id, research_papers.paper_title, COUNT(publish_records.author_id) AS Author_Count FROM research_papers LEFT JOIN publish_records ON publish_records.paper_id = research_papers.paper_id GROUP BY research_papers.paper_id;`,
    `SELECT COUNT(*) AS 'Num of Papers Published By Female Researchers' FROM publish_records JOIN authors ON authors.gender = "Female" AND authors.author_id = publish_records.author_id;`,
    `SELECT university, AVG(h_index) AS 'Average H-index' FROM authors GROUP BY university;`,
    `SELECT authors.university, COUNT(publish_records.paper_id) FROM publish_records LEFT JOIN authors ON authors.author_id = publish_records.author_id GROUP BY authors.university;`,
    `SELECT university, MAX(h_index) AS 'Highest H-index', MIN(h_index) AS 'Lowest H-index' FROM authors GROUP BY university;`
]



const insertValues = (value) => {
    connection.query(value, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Value added", result)
    })
}

values.forEach(value => insertValues(value));

connection.end();

