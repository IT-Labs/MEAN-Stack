import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AllCompaniesAction } from './companies-actions';
import { CompanyService } from '../../services/company.service';
import { tap } from 'rxjs/operators';
import { CompanyModel } from '../../models/company-model';
import stateProduce from './state-produce';

export interface CompanyStateModel {
  companies: CompanyModel[];
}

@State<CompanyStateModel>({
  name: 'companyState',
  defaults: {
    companies: [],
  },
})
@Injectable()
export class CompanyState {
  constructor(private companyService: CompanyService) {}

  @Selector()
  static companiesSelector(state: CompanyStateModel) {
    return state.companies;
  }

  @Action(AllCompaniesAction)
  allCompaniesAction(ctx: StateContext<any>) {
    this.companyService
      .getAll()
      .pipe(
        tap(allCompanies => {
          stateProduce(ctx, state => {
            state.companies = allCompanies;
          });
        })
      )
      .subscribe();
  }
}
