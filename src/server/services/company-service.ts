import { MongoClient, ObjectID } from 'mongodb';
import { ICompany } from '../models/ICompany';
import { ICompanyBank } from '../models/ICompanyBank';
import { companySchema } from '../validators/company-schema';
import { getDb } from './client-service'

export class CompanyService {

  db = getDb();
  collection: string = 'companies';

  public async getAll() {
    return await this.db
      .collection(this.collection)
      .find({})
      .toArray();
  }

  public async getById(id: string): Promise<ICompany> {
    return (await this.db
      .collection(this.collection)
      .findOne({ _id: new ObjectID(id) })) as Promise<ICompany>;
  }

  public async create(company: ICompany) {
    await companySchema.validateAsync(company);

    company.created = new Date();
    return await this.db
      .collection(this.collection)
      .insertOne(company);
  }

  public async update(
    id: string,
    company: ICompany
  ) {
    await companySchema.validateAsync(company);

    const query = { _id: new ObjectID(id) };
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
    return await this.db
      .collection(this.collection)
      .updateOne(query, newvalues);
  }

  public async delete(id: string) {
    const query = { _id: new ObjectID(id) };
    return await this.db
      .collection(this.collection)
      .deleteOne(query);
  }

  public async addCompanyBank(
    id: string,
    account: ICompanyBank
  ) {
    const query = { _id: new ObjectID(id) };
    const newCompanyBankValue = { $push: { companyBanks: account } };

    return await this.db
      .collection(this.collection)
      .findOneAndUpdate(query, newCompanyBankValue);
  }

  public async deleteCompanyBank(id: string, bankId: string) {
    const query = { _id: new ObjectID(id) };
    const deleteCompanyBankValue = {
      $pull: { companyBanks: { bankId } },
    };

    return await this.db
      .collection(this.collection)
      .findOneAndUpdate(query, deleteCompanyBankValue);
  }
}
