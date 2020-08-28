import { AccountModel } from './account-model';

export class CompanyModel {
    _id: string;
    name: string;
    taxNumber: string;
    address: string;
    city: string;
    zipCode: number;
    state: number;
    country: number;
    companyBanks?: AccountModel[];
  }
