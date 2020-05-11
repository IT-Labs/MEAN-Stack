import { MongoClient } from "mongodb";
import { ICompany } from "../models/ICompany";
import { ICompanyBank } from '../models/ICompanyBank';
const ObjectId = require("mongodb").ObjectID;

export class CompanyService {
  db: string = "mean_stack";
  collection: string = "companies";
  uri: string =
    "mongodb+srv://testuser:o98wHwKDlGeW7QaK@testcluster-qhjws.mongodb.net/test?retryWrites=true&w=majority";

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

  public async create(
    name: string,
    taxNumber: string,
    address: string,
    city: string,
    zipcode: string,
    state: string,
    country: string
  ) {
    const company: ICompany = {
      name: name,
      taxNumber: taxNumber,
      address: address,
      city: city,
      zipcode: zipcode,
      state: state,
      country: country,
      created: new Date()
    };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .insertOne(company);
  }

  public async update(
    id: string,
    name: string,
    taxNumber: string,
    address: string,
    city: string,
    zipcode: string,
    state: string,
    country: string
  ) {
    var query = { _id: new ObjectId(id) };
    var newvalues = {
      $set: {
        name: name,
        taxNumber: taxNumber,
        address: address,
        city: city,
        zipcode: zipcode,
        state: state,
        country: country
      },
    };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .updateOne(query, newvalues);
  }

  public async delete(id: string) {
    var query = { _id: new ObjectId(id) };
    return await this.client
      .db(this.db)
      .collection(this.collection)
      .deleteOne(query);
  }

  public async addCompanyBank(
    id: string,    
    bankId: string,
    bankName?: string,
    currency?: string,
    accountNumber?: string
  ) {
    var query = { _id: new ObjectId(id) };

    var companyBank: ICompanyBank = {
      bankId: bankId,
      bankName: bankName,
      currency: currency,
      accountNumber: accountNumber
    };

    var newCompanyBankValue = { $push: { companyBanks: companyBank }};

    return await this.client
      .db(this.db)
      .collection(this.collection)
      .findOneAndUpdate(query, newCompanyBankValue);
  }

  public async deleteCompanyBank(
    id: string,    
    bankId: string
  ) {
    var query = { _id: new ObjectId(id) };
    var deleteCompanyBankValue = { $pull: { companyBanks: { bankId: bankId} } }

    return await this.client
      .db(this.db)
      .collection(this.collection)
      .findOneAndUpdate(query, deleteCompanyBankValue);
  }
}
