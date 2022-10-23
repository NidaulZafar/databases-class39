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
    `SELECT research_papers.paper_id, research_papers.paper_title, SUM(1 + co_authors) FROM research_papers LEFT JOIN authors ON research_papers.author_id = authors.author_id GROUP BY research_papers.paper_id;`,
    `SELECT COUNT(*) AS 'Num of Papers Published By Female Researchers' FROM research_papers JOIN authors ON research_papers.author_id = authors.author_id WHERE authors.gender = 'Female';`,
    `SELECT university, AVG(h_index) AS 'Average H-index' FROM authors GROUP BY university;`,
    `SELECT university, COUNT(paper_id) FROM research_papers JOIN authors ON research_papers.author_id = authors.author_id GROUP BY authors.university;`,
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

