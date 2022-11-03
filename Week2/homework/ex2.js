import mysql from "mysql";
import {createTable} from "./functions.js";
import {inputValues} from "./functions.js";




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



createTable(`CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT,
    paper_title VARCHAR(200),
    conference TEXT,
    publish_date DATETIME,
    PRIMARY KEY (paper_id)
);`)


 
inputValues(`ALTER TABLE research_Papers
ADD Author_id INT,
ADD CONSTRAINT paper_author FOREIGN KEY (Author_id) REFERENCES researchData.Authors (author_id),
ADD Co_authors INT DEFAULT 0;`)


inputValues(`
INSERT INTO research_Papers (
    paper_id, paper_title, conference, publish_date
)
VALUES
(1, 'Literature Research Paper', 'Literature conference', '2022-12-08'),
(2, 'Literary Research Paper', 'Literature conference', '2022-12-08'),
(3, 'Lit. Research Paper', 'Literature conference', '2022-12-08'),
(4, 'Medical Research Paper', 'Medical conference', '2022-10-08'),
(5, 'Medicine Research Paper', 'Medical conference', '2022-10-08'),
(6, 'Medical issues Research Paper', 'Medical conference', '2022-10-08'),
(7, 'Medical importance Research Paper', 'Medical conference', '2022-09-08'),
(8, 'Advance Medicine Research Paper', 'Medical conference', '2022-09-08'),
(9, 'Dystopia Research Paper', 'Literature conference', '2022-09-08'),
(10, 'Utopia Research Paper', 'Literature conference', '2022-08-08'),
(11, 'Dental Research Paper', 'Dental conference', '2022-08-08'),
(12, 'Dental Braces Research Paper', 'Dental conference', '2022-08-08'),
(13, 'Dental Studies Research Paper', 'Dental conference', '2022-07-08'),
(14, 'Dental advancements Research Paper', 'Dental conference', '2022-07-08'),
(15, 'Physics Research Paper', 'Physics conference', '2022-07-08'),
(16, 'Physical advancements Research Paper', 'Physics conference', '2022-06-08'),
(17, 'Physical issues Research Paper', 'Physics conference', '2022-06-08'),
(18, 'Physics inventions Research Paper', 'Physics conference', '2022-06-08'),
(19, 'Physics latest Research Paper', 'Physics conference', '2022-06-08'),
(20, 'Social Sciences Research Paper', 'Social Sciences conference', '2022-05-08'),
(21, 'Society Research Paper', 'Social Sciences conference', '2022-05-08'),
(22, 'Social Behavior Research Paper', 'Social Sciences conference', '2022-05-08'),
(23, 'Social issues Research Paper', 'Social Sciences conference', '2022-05-08'),
(24, 'Social importance Research Paper', 'Social Sciences conference', '2022-05-08'),
(25, 'Dentists Research Paper', 'Dental conference', '2022-04-08'),
(26, 'Teeth Research Paper', 'Dental conference', '2022-04-08'),
(27, 'HYF Research Paper', 'Web Development conference', '2022-03-08'),
(28, 'JS Research Paper', 'Web Development conference', '2022-03-08'),
(29, 'React Research Paper', 'Web Development conference', '2022-03-08'),
(30, 'Angular Research Paper', 'Web Development conference', '2022-03-08')
`)


createTable(`CREATE TABLE Publish_records (
    Author_id INT,
    paper_id INT,
    FOREIGN KEY( Author_id ) references Authors( Author_id ),
    FOREIGN KEY( paper_id ) references research_papers( paper_id ),
    PRIMARY KEY (Author_id, paper_id)
    ) ;`
)

inputValues(`
    INSERT INTO Publish_records (Author_id, paper_id)
    VALUES
    (1, 1),
    (1, 16),
    (2, 2),
    (2, 17),
    (3, 3),
    (3, 18),
    (4, 4),
    (4, 19),
    (5, 5),
    (5, 20),
    (6, 6),
    (6, 21),
    (7, 7),
    (7, 22),
    (8, 8),
    (8, 23),
    (9, 9),
    (9, 24),
    (10, 10),
    (10, 25),
    (11, 11),
    (11, 26),
    (12, 12),
    (12, 27),
    (13, 13),
    (13, 28),
    (14, 14),
    (14, 29),
    (15, 15),
    (15, 30),
    (1, 15),
    (2, 16),
    (4, 17),
    (5, 18),
    (6, 19),
    (7, 20),
    (8, 21),
    (9, 22),
    (10, 23);`
)

connection.end();