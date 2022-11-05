import { collection } from "./index.js";

export const createAccount = async (account_number, balance) => {
  const newAccount = {
    account_number: account_number,
    balance: balance,
    account_changes: [],
  };

  const result = await collection.insertOne(newAccount);
  console.log(`Account with id: ${result.insertedId} created`);
};