import { MongoClient } from 'mongodb';
import { IBank } from '../models/IBank';
import MeanStackServer from '../mean-stack-server';
const ObjectId = require('mongodb').ObjectID;

export class BankService {
  collection: string = 'banks';
  db: string = 'mean_stack';
  uri: string =
    'mongodb+srv://testuser:o98wHwKDlGeW7QaK@testcluster-qhjws.mongodb.net/test?retryWrites=true&w=majority';

  client: MongoClient;

  constructor() {
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
  }

  public async connect() {
    await this.client.connect();
  }

  public async getAll() {
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .find({})
      .toArray();
  }

  public async getById(id: string): Promise<IBank> {
    return (await this.client
      .db(this.db)
      .collection(this.collection)
      .findOne({ _id: new ObjectId(id) })) as Promise<IBank>;
  }

  public async create(name: string, swiftCode: string) {
    const bank: IBank = {
      name,
      swiftCode,
      created: new Date(),
    };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .insertOne(bank);
  }

  public async update(id: string, name: string, swiftCode: string) {
    const query = { _id: new ObjectId(id) };
    const newvalues = { $set: { name, swiftCode } };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .updateOne(query, newvalues);
  }

  public async delete(id: string) {
    const query = { _id: new ObjectId(id) };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .deleteOne(query);
  }
}
