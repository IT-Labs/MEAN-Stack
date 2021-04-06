import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureLayoutComponent } from './layouts/secure-layout/secure-layout.component';
import { CompaniesComponent } from './companies/companies/companies.component';
import { LoginComponent } from './auth/login.component';
import { CompanyComponent } from './companies/company/company.component';
import { BanksComponent } from './banks/banks/banks.component';
import { BankComponent } from './banks/bank/bank.component';
import { CompanyAccountsComponent } from './companies/company-accounts/company-accounts.component';
import { KitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: '',
    component: SecureLayoutComponent,
    children: [
      {
        path: 'companies',
        component: CompaniesComponent,
        data: {
          title: 'Companies',
        },
      },
      {
        path: 'companies/:id',
        component: CompanyComponent,
        data: {
          title: 'Company',
        },
      },
      {
        path: 'companies/new',
        component: CompanyComponent,
        data: {
          title: 'Company',
        },
      },
      {
        path: 'banks',
        component: BanksComponent,
        data: {
          title: 'Banks',
        },
      },
      {
        path: 'banks/:id',
        component: BankComponent,
        data: {
          title: 'Bank',
        },
      },
      {
        path: 'banks/new',
        component: BankComponent,
        data: {
          title: 'Bank',
        },
      },
      {
        path: 'company/:id/accounts',
        component: CompanyAccountsComponent,
        data: {
          title: 'Company',
        },
      },
      {
        path: 'kitchen-sink',
        component: KitchenSinkComponent,
        data: {
          title: 'KitchenSink',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
