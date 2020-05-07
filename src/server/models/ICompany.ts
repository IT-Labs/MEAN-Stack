import { ICompanyBank } from './ICompanyBank';

export interface ICompany {
  id?: string;
  name?: string;
  taxNumber?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  state?: string;
  country?: string;
  created?: Date;
  companyBanks?: ICompanyBank[];
}

