import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

const uri: string =
  'mongodb+srv://testuser:o98wHwKDlGeW7QaK@testcluster-qhjws.mongodb.net/test?retryWrites=true&w=majority';

let db: Db;
let client: MongoClient;

export async function connectToMongoServer() {

  if(process.env.NODE_ENV === 'test'){
    const testUri = await mongod.getConnectionString('mean_stack');
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      };
    client = new MongoClient(testUri, mongooseOpts);
  }else{
    const config = { useUnifiedTopology: true, useNewUrlParser: true };
    client = new MongoClient(uri, config);
  }

  await client.connect();
  db = client.db('mean_stack');
}

export function getDb(): Db {
  return db;
}
