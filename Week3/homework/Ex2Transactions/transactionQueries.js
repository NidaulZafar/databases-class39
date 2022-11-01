export const transactionQueries = [
    {
        title: "Amount Deducted from one Account",
        query: `UPDATE Account SET balance = balance - 1000 WHERE account_number = 456;`
    },
    {
        title: "Change of deduction added in account changes table",
        query: `INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES(456, 1000, "2022-11-01", "Kitchen Money Paid");`
    },
    {
        title: "Amount added into another account",
        query: `UPDATE Account SET balance = balance + 1000 WHERE account_number = 789;`
    },
    {
        title: "Change of addition added in account changes table",
        query: `INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES(789, 1000, "2022-11-01", "Received Kitchen Money");`
    }
]