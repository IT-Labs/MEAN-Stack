export interface CompanyModel {
  address: string;
  city: string;
  companyBanks?: AccountModel[];
  country: string;
  created: string;
  name: string;
  state: number;
  taxNumber: string;
  zipCode: number;
  _id: string;
}

export class AccountModel {
  name: string;
  swiftCode: string;
  _id: string;
}
