import { collection } from "./index.js";

export const transaction = async (client, sender, receiver, amount, remarks) => {
    const senderChange = await createTransferRecord(sender, amount * -1, remarks);
    const receiverChange = await createTransferRecord(receiver, amount, remarks);
    const session = await client.startSession();
    try {
        await session.withTransaction(async () => {
            await collection.updateOne(
                { account_number: sender },
                {
                    $inc: { balance: amount * -1 },
                    $push: { account_changes: senderChange },
                },
                { session }
                
            );
            await collection.updateOne(
                { account_number: receiver },
                {
                    $inc: { balance: amount },
                    $push: { account_changes: receiverChange },
                },
                { session }
            );

        });
        console.log(`${amount} transferred successfully!`);        
    } catch (error) {
        await session.abortTransaction();
        console.log(`Transferred Failed! ${error}`);
    } finally {
        await session.endSession();
    }
}


const createTransferRecord = async (account_number, amount, remarks) => {
    const account = await collection.findOne({
      account_number: account_number,
    });
  
    const numberOfChanges = account["account_changes"].length;
    let account_change = {
      change_number: numberOfChanges + 1,
      amount: amount,
      changed_date: new Date(),
      remarks: remarks,
    };
    return account_change;
  };