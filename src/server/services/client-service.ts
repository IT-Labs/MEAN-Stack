import { MongoClient, Db } from 'mongodb';

const uri: string = 'mongodb+srv://testuser:o98wHwKDlGeW7QaK@testcluster-qhjws.mongodb.net/test?retryWrites=true&w=majority';
let db: Db;
let client: MongoClient;

export async function connectToMongoServer() {
    const config = { useUnifiedTopology: true, useNewUrlParser: true };
    client = new MongoClient(uri, config );
    await client.connect();
    db = client.db(process.env.db);
}

export function getDb(): Db {
    return db;
}

