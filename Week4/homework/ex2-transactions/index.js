import { MongoClient } from "mongodb";
import { transaction } from "./transfer.js";
import { createAccount } from "./setup.js";
const uri = `mongodb+srv://mongodb:mongodb@cluster1.qnbcuf7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
export const collection = client.db('databaseWeek4').collection('accounts');
async function main() {
  try {
    await client.connect();
    await createAccount(123, 3000);
    await createAccount(456, 7000);
    await transaction(client, 456, 123, 1000, "Pizza Money");
  } catch (e) {
      console.error(e);
  }
  finally {
      await client.close();
  }
}

main().catch(console.error);