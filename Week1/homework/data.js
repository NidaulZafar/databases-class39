import Chance from 'chance';
const chance = new Chance();

export const tables = [
    `CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT, 
        invitee_name VARCHAR(50),
        invited_by VARCHAR(50)
    );`,
  
    `CREATE TABLE IF NOT EXISTS Room (
        room_no INT PRIMARY KEY, 
        room_name VARCHAR(50), 
        floor_number INT
    );`,
  
    `CREATE TABLE IF NOT EXISTS Meeting (
        meeting_no INT ,
        meeting_title VARCHAR(50),
        starting_time DATETIME ,
        ending_time DATETIME,
        room_no int,
        FOREIGN KEY(room_no) REFERENCES ROOM(room_no) 
    );`,
];
  
export const tableValue = [
    `INSERT INTO Invitee (invitee_no, invitee_name, invited_by)
    VALUES (1, '${chance.name()}', '${chance.name()}'),
    (2, '${chance.name()}', '${chance.name()}'),
    (3, '${chance.name()}', '${chance.name()}'),
    (4, '${chance.name()}', '${chance.name()}'),
    (5, '${chance.name()}', '${chance.name()}')`,

    `INSERT INTO Room (room_no, room_name, floor_number)
    VALUES (101, '${chance.profession()}', 1),
    (202, '${chance.profession()}',2),
    (303, '${chance.profession()}',3),
    (404, '${chance.profession()}',4),
    (505, '${chance.profession()}',5)`,

    `INSERT INTO Meeting(meeting_no, meeting_title, starting_time, ending_time, room_no)
    VALUES(1,'Daily Standup', '2022-10-19 09:00:00', '2022-10-19 11:00:00', 101),
    (2,'Weekly meeting', '2022-10-27 12:00:00', '2022-10-27 15:30:00', 202),
    (3,'Monthly Dinner', '2022-10-30  18:30:00','2022-10-30  20:30:00', 303),
    (4,'Quarterly Progress', '2022-12-01 10:30:00','2022-12-01 12:00:00', 404),
    (5,'Annual Report', '2022-12-31 13:00:00','2022-12-31 15:00:00', 505)`   
]


export const worldQueries = [
    `SELECT name FROM country WHERE population > 800000`,
    `SELECT name FROM country WHERE name LIKE '%land%'`,
    `SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;`,
    `SELECT name FROM country WHERE continent = 'Europe'`,
    `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC;`,
    `SELECT name FROM city WHERE CountryCode = 'NLD'`,
    `SELECT name, population FROM city WHERE name = 'Rotterdam'`,
    `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10;`,
    `SELECT name, population FROM city ORDER BY population DESC LIMIT 10;`,
    `SELECT SUM(population) FROM country`
]