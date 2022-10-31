const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://mongodb:mongodb@cluster1.qnbcuf7.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        // await findListing(client);
        // await findListingAccordingToReleaseToo(client, 2000, 2010);
        // await updateListingUsingUpdateAndPush(client, "Pulp Fiction", "Sam");
        // await upsertListing(client, "The Chawal", {synopsis: "The dwarves, along with ..."} )
        // Text Search 1
        // await searchListingSynopsis(client, { synopsis: /Bilbo/ });
        // Text Search 2
        // await searchListingSynopsis(client, {synopsis: /.Gandalf./});
        // Text Search 3
        // await searchListingSynopsis(client, {$and: [{synopsis: /Bilbo/}, {synopsis: {$not: /Gandalf/}}]});
        // Text Search 4
        // await searchListingSynopsis(client, {$or: [{synopsis: /dwarves/}, {synopsis: /hobbit/}]});
        // Text Search 5
        // await searchListingSynopsis(client, { $and: [{ synopsis: /gold/ }, { synopsis: /dragon/}]});
        // await deleteListing(client, "Pee Wee Herman's Big Adventure")
        // await deleteListing(client, "Avatar")
        // await createCollection(client, "users");
        // await createCollection(client, "posts");
        // await createCollection(client, "comments");
        // await createMultipleListings(client, [
        //     {
        //     username: "GoodGuyGreg",
        //     first_name: "Good Guy",
        //     last_name: "Greg"
        //     },
        //     {
        //     username: "ScumbagSteve",
        //     full_name:
        //         {first : "Scumbag",
        //         last: "Steve"
        //         }
        //     }
        // ])
        // await createMultipleListings(client, "posts", [
        //     {
        //         username: "GoodGuyGreg",
        //         title: "Passes out at party",
        //         body: "Wakes up early and cleans house"
        //     },
        //     {
        //         username: "GoodGuyGreg",
        //         title: "Steals your identity",
        //         body: "Raises your credit score"
        //     },
        //     {
        //         username: "GoodGuyGreg",
        //         title: "Reports a bug in your code",
        //         body: "Sends you a Pull Request"
        //     },
        //     {
        //         username: "ScumbagSteve",
        //         title: "Borrows something",
        //         body: "Sells it"
        //     },
        //     {
        //         username: "ScumbagSteve",
        //         title: "Borrows everything",
        //         body: "The end"
        //     },
        //     {
        //         username: "ScumbagSteve",
        //         title: "Forks your repo on github",
        //         body: "Sets to private"
        //     }
        // ]);
        // await createMultipleListings(client, "comments", [
        //     {
        //         username: "GoodGuyGreg",
        //         comment: "Hope you got a good deal!",
        //         post: "635fe83e5c1006b0d7c2a61e"
        //     },
        //     {
        //         username: "GoodGuyGreg",
        //         comment: "What's mine is yours!",
        //         post: "635fe83e5c1006b0d7c2a61f"
        //     },
        //     {
        //         username: "GoodGuyGreg",
        //         comment: "Don't violate the licensing agreement!",
        //         post: "635fe83e5c1006b0d7c2a620"
        //     },
        //     {
        //         username: "ScumbagSteve",
        //         comment: "It still isn't clean",
        //         post: "635fe83e5c1006b0d7c2a61b"
        //     },
        //     {
        //         username: "ScumbagSteve",
        //         comment: "Denied your PR cause I found a hack",
        //         post: "635fe83e5c1006b0d7c2a61d"
        //     }
        // ]);
        // Related collection query 1
        // await findListing(client, "users")
        // Related collection query 2
        // await findListing(client, "posts")
        // Related collection query 3
        // await findListingAccordingToAuthor(client, "posts", "GoodGuyGreg");
        // Related collection query 4
        // await findListingAccordingToAuthor(client, "posts", "ScumbagSteve");
        // Related collection query 5
        // await findListing(client, "comments")
        // Related collection query 6
        // await findListingAccordingToAuthor(client, "comments", "GoodGuyGreg");
        // Related collection query 7
        // await findListingAccordingToAuthor(client, "comments", "ScumbagSteve");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);
// Query / Find Documents
// 1
async function findListing(client, name) {
    const cursor = client.db("mongo_practice").collection(name).find({});
    const result = await cursor.toArray();
    console.log(result);
}
// 2
async function findListingAccordingToWriter(client, name) {
    const cursor = client.db("mongo_practice").collection("movies").find({writer: name});
    const result = await cursor.toArray();
    console.log(result);
}
// 3
async function findListingAccordingToActor(client, name) {
    const cursor = client.db("mongo_practice").collection("movies").find({actors: name});
    const result = await cursor.toArray();
    console.log(result);
}
// 4
async function findListingAccordingToFranchise(client, name) {
    const cursor = client.db("mongo_practice").collection("movies").find({franchise: name});
    const result = await cursor.toArray();
    console.log(result);
}
// 5
async function findListingAccordingToRelease(client, start, end) {
    const cursor = client.db("mongo_practice").collection("movies").find({$and: [{year: {$gt: start}}, {year: {$lt: end}}]});
    const result = await cursor.toArray();
    console.log(result);
}
// 6
async function findListingAccordingToReleaseToo(client, start, end) {
    const cursor = client.db("mongo_practice").collection("movies").find({$or: [{year: {$lt: start}}, {year: {$gt: end}}]});
    const result = await cursor.toArray();
    console.log(result);
}
// Text Search
// 1
async function searchListingSynopsis(client, name) {
    const cursor = client.db("mongo_practice").collection("movies").find(name);
    const result = await cursor.toArray();
    console.log(result);
}
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`-${db.name}`);
    });
}
async function createListing(client, newListing) {
    const result = await client.db("mongo_practice").collection("movies").insertOne(newListing);
    console.log(`New listing created with id: ${result.insertedId}`);
}
async function createMultipleListings(client, collectionName, newListings) {
    const result = await client.db("mongo_practice").collection(collectionName).insertMany(newListings);
    console.log(`${result.insertedCount} new listings created:`);
    console.log(result.insertedIds);
}
async function updateListingOne(client, name, updated) {
    const update = await client.db("mongo_practice").collection("movies").updateOne({ title: name }, { $set: updated });
    const cursor = client.db("mongo_practice").collection("movies").find({title: name});
    const result = await cursor.toArray();
    console.log(result);
}
async function updateListingUsingUpdateAndPush(client, nameOfMovie, name ) {
    const update = await client.db("mongo_practice").collection("movies").updateOne({title: nameOfMovie}, {$push: {actors: name}});
    const cursor = client.db("mongo_practice").collection("movies").find({title: nameOfMovie});
    const result = await cursor.toArray();
    console.log(result);
}
async function upsertListing(client, name, updated) {
    const update = await client.db("mongo_practice").collection("movies").updateOne({ title: name }, { $set: updated }, {upsert: true});
    const cursor = client.db("mongo_practice").collection("movies").find({title: name});
    const result = await cursor.toArray();
    console.log(result);
}
async function deleteListing(client, nameofListing) {
    const result = await client.db("mongo_practice").collection("movies").deleteOne({ title: nameofListing });
    console.log(`${result.deletedCount} document(s) was/were deleted`)
}
async function createCollection(client, name) {
    const result = await client.db("mongo_practice").createCollection(name);
    console.log(`collection named ${name} created!`);
}
async function findListingAccordingToAuthor(client, collectionName, authorName) {
    const cursor = client.db("mongo_practice").collection(collectionName).find({username: authorName});
    const result = await cursor.toArray();
    console.log(result);
}
// function for last related collection query (UNSOLVED)
async function findListingAccordingToPost(client, collectionName, post) {
    const cursor = client.db("mongo_practice").collection(collectionName).find(post)
    const result = await cursor.toArray();
    console.log(result);
}