import { MongoClient } from 'mongodb';
import { ICompany } from '../models/ICompany';
import { ICompanyBank } from '../models/ICompanyBank';
const ObjectId = require('mongodb').ObjectID;

export class CompanyService {
  db: string = 'mean_stack';
  collection: string = 'companies';
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

  public async getById(id: string): Promise<ICompany> {
    return (await this.client
      .db(this.db)
      .collection(this.collection)
      .findOne({ _id: new ObjectId(id) })) as Promise<ICompany>;
  }

  public async create(company: ICompany) {

    return await this.client
      .db(this.db)
      .collection(this.collection)
      .insertOne(company);
  }

  public async update(
    id: string,
    company: ICompany
  ) {
    const query = { _id: new ObjectId(id) };
    const newvalues = {
      $set: {
        name: company.name,
        taxNumber: company.taxNumber,
        address: company.address,
        city: company.city,
        zipcode: company.zipcode,
        state: company.state,
        country: company.country
      },
    };
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

  public async addCompanyBank(
    id: string,
    account: ICompanyBank
  ) {
    const query = { _id: new ObjectId(id) };
    const newCompanyBankValue = { $push: { companyBanks: account } };

    return await this.client
      .db(this.db)
      .collection(this.collection)
      .findOneAndUpdate(query, newCompanyBankValue);
  }

  public async deleteCompanyBank(id: string, bankId: string) {
    const query = { _id: new ObjectId(id) };
    const deleteCompanyBankValue = {
      $pull: { companyBanks: { bankId } },
    };

    return await this.client
      .db(this.db)
      .collection(this.collection)
      .findOneAndUpdate(query, deleteCompanyBankValue);
  }
}
