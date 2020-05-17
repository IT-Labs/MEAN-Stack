import { MongoClient, ObjectID } from 'mongodb';
import { IBank } from '../models/IBank';
import MeanStackServer from '../mean-stack-server';
import { bankSchema } from '../validators/bank-schema'

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
      .findOne({ _id: new ObjectID(id) })) as Promise<IBank>;
  }

  public async create(bank: IBank) {
    await bankSchema.validateAsync(bank);

    bank.created = new Date();
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .insertOne(bank);
  }

  public async update(id: string, bank: IBank) {
    await bankSchema.validateAsync(bank);

    const query = { _id: new ObjectID(id) };
    const newvalues = { $set: { name: bank.name, swiftCode: bank.swiftCode } };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .updateOne(query, newvalues);
  }

  public async delete(id: string) {
    const query = { _id: new ObjectID(id) };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .deleteOne(query);
  }
}
