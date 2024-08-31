const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    try {
        const client = new MongoClient(process.env.DB_HOST);
        await client.connect();
        singleton = client.db(process.env.DB_DATABASE);
        console.log("Connected to database");
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }

    return singleton;
}

async function insertOne(collection, objeto) {
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

let find_All = async (collection) => {
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

let findOne = async (collection, _id) => {
    const db = await connect();
    console.log({ '_id': new ObjectId(_id) });
    let obj = await db.collection(collection).find({ '_id': new ObjectId(_id) }).toArray();
    console.log(obj);
    if (obj.length > 0)
        return obj[0];
    return false;
}

let updateOne = async (collection, object, param) => {
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: object });
    return result;
}

module.exports = { find_All, insertOne, findOne, updateOne };