import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { LoginComponent } from './login/login.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { BanksComponent } from './banks/banks.component';
import { BankComponent } from './bank/bank.component';
import { CompanyAccountsComponent } from './company-accounts/company-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitchenSinkModule } from '../kitchen-sink/kitchen-sink.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const DECLARATIONS = [
  LoginComponent,
  CompaniesComponent,
  CompanyComponent,
  BanksComponent,
  BankComponent,
  CompanyAccountsComponent,
];

const MODULES = [
  ReactiveFormsModule,
  CommonModule,
  BrowserModule,
  HttpClientModule,
  FormsModule,
  TooltipModule.forRoot(),
  SvgIconsModule.forRoot(),
  KitchenSinkModule,
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class ComponentsModule {}
