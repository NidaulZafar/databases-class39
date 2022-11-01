export const TABLES = [
    {
        title: "Account Table Created!",
        query: `CREATE TABLE IF NOT EXISTS Account (
            account_number INT PRIMARY KEY, 
            balance INT
        );`
    },
    {
        title: "Account Changes Table Created",
        query: `CREATE TABLE IF NOT EXISTS account_changes(
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount FLOAT,
        changed_date DATE, 
        remark VARCHAR(200),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
        );`
    }
];
