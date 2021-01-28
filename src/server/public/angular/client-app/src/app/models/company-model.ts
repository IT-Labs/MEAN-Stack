export interface CompanyModel {
  address: string;
  city: string;
  country: number;
  companyBanks?: AccountModel[];
  _id: string;
  name: string;
  state: number;
  taxNumber: string;
  zipCode: number;
}

export class AccountModel {
  name: string;
  swiftCode: string;
  _id: string;
}
