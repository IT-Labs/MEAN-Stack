import { MongoClient, ObjectID } from 'mongodb';
import { IBank } from '../models/IBank';
import MeanStackServer from '../mean-stack-server';
import { bankSchema } from '../validators/bank-schema'
import { getDb } from './client-service'
import { CompanyService } from './company-service';

export class BankService  {
  db = getDb();
  collection: string = 'banks';
  companyService = new CompanyService();

  public async getAll() {
    return await this.db
      .collection(this.collection)
      .find({})
      .toArray();
  }

  public async getById(id: string): Promise<IBank> {
    return (await this.db
      .collection(this.collection)
      .findOne({ _id: new ObjectID(id) })) as Promise<IBank>;
  }

  public async create(bank: IBank) {
    await bankSchema.validateAsync(bank);

    bank.created = new Date();
    return await this.db
    .collection(this.collection)
      .insertOne(bank);
  }

  public async update(id: string, bank: IBank) {
    await bankSchema.validateAsync(bank);

    const query = { _id: new ObjectID(id) };
    const newvalues = { $set: { name: bank.name, swiftCode: bank.swiftCode } };
    return await this.db
    .collection(this.collection).updateOne(query, newvalues);
  }

  public async delete(id: string) {
    const query = { _id: new ObjectID(id) };
    return await this.db
    .collection(this.collection)
      .deleteOne(query);
  }
}
