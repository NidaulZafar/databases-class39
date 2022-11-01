export const INSERT_DATA = [
    {
        title: "Data inserted into Accounts",
        query: `INSERT INTO Account ( account_number, balance)
        VALUES
        (123, 5000),
        (456, 7000),
        (789, 3500);`
    },
    {
        title: "Data inserted into account_changes",
        query: `INSERT INTO account_changes(account_number, amount, changed_date, remark)
           VALUES (123, 1000, "2022-11-01", "Dinner Money");`
    }
];

