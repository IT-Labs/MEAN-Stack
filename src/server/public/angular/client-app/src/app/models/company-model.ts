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
  accountNumber: string;
  bankId: string;
  bankName: string;
  currency: string;
}
