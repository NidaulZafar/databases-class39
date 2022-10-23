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



const createTable = (table) => {
    connection.query(table, (err, result) => {
        if (err) {
            throw err
        }
        console.log("Table Created");
    })
};

createTable(`CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT,
    paper_title VARCHAR(200),
    conference TEXT,
    publish_date DATETIME,
    PRIMARY KEY (paper_id)
);`)

const inputValues = (value) => {
    connection.query(value, (err, result) => {
        if (err) {
            throw err;
        }
      console.log("value added in Table");
    });
};
 
inputValues(`ALTER TABLE research_Papers
ADD Author_id INT,
ADD CONSTRAINT paper_author FOREIGN KEY (Author_id) REFERENCES researchData.Authors (author_id),
ADD Co_authors INT DEFAULT 0;`)


inputValues(`
INSERT INTO research_Papers (
    paper_id, paper_title, conference, publish_date, Author_id, Co_authors
)
VALUES
(1, 'Literature Research Paper', 'Literature conference', '2022-12-08', 1, DEFAULT),
(2, 'Literary Research Paper', 'Literature conference', '2022-12-08', 1, DEFAULT),
(3, 'Lit. Research Paper', 'Literature conference', '2022-12-08', 2, 2),
(4, 'Medical Research Paper', 'Medical conference', '2022-10-08', 2, DEFAULT),
(5, 'Medicine Research Paper', 'Medical conference', '2022-10-08', 3, DEFAULT),
(6, 'Medical issues Research Paper', 'Medical conference', '2022-10-08', 3, 3),
(7, 'Medical importance Research Paper', 'Medical conference', '2022-09-08', 3, DEFAULT),
(8, 'Advance Medicine Research Paper', 'Medical conference', '2022-09-08', 4, DEFAULT),
(9, 'Dystopia Research Paper', 'Literature conference', '2022-09-08', 4, 2),
(10, 'Utopia Research Paper', 'Literature conference', '2022-08-08', 4, DEFAULT),
(11, 'Dental Research Paper', 'Dental conference', '2022-08-08', 6, DEFAULT),
(12, 'Dental Braces Research Paper', 'Dental conference', '2022-08-08', 6, 3),
(13, 'Dental Studies Research Paper', 'Dental conference', '2022-07-08', 6, DEFAULT),
(14, 'Dental advancements Research Paper', 'Dental conference', '2022-07-08', 7, DEFAULT),
(15, 'Physics Research Paper', 'Physics conference', '2022-07-08', 7, 3),
(16, 'Physical advancements Research Paper', 'Physics conference', '2022-06-08', 7, DEFAULT),
(17, 'Physical issues Research Paper', 'Physics conference', '2022-06-08', 9, DEFAULT),
(18, 'Physics inventions Research Paper', 'Physics conference', '2022-06-08', 9, DEFAULT),
(19, 'Physics latest Research Paper', 'Physics conference', '2022-06-08', 9, DEFAULT),
(20, 'Social Sciences Research Paper', 'Social Sciences conference', '2022-05-08', 10, DEFAULT),
(21, 'Society Research Paper', 'Social Sciences conference', '2022-05-08', 10, 4),
(22, 'Social Behavior Research Paper', 'Social Sciences conference', '2022-05-08', 10, DEFAULT),
(23, 'Social issues Research Paper', 'Social Sciences conference', '2022-05-08', 12, DEFAULT),
(24, 'Social importance Research Paper', 'Social Sciences conference', '2022-05-08', 12, DEFAULT),
(25, 'Dentists Research Paper', 'Dental conference', '2022-04-08', 12, DEFAULT),
(26, 'Teeth Research Paper', 'Dental conference', '2022-04-08', 13, DEFAULT),
(27, 'HYF Research Paper', 'Web Development conference', '2022-03-08', 13, 3),
(28, 'JS Research Paper', 'Web Development conference', '2022-03-08', 13, DEFAULT),
(29, 'React Research Paper', 'Web Development conference', '2022-03-08', 15, DEFAULT),
(30, 'Angular Research Paper', 'Web Development conference', '2022-03-08', 15, DEFAULT)
`)


connection.end();