import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAccountsComponent } from './company-accounts/company-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/components/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CompanyAccountsModal } from './company-accounts-modal/company-accounts-modal';
import { PopoverModule } from 'ngx-bootstrap/popover';

const DECLARATIONS = [
  CompaniesComponent,
  CompanyComponent,
  CompanyAccountsComponent,
  CompanyAccountsModal,
];

const MODULES = [
  ReactiveFormsModule,
  CommonModule,
  BrowserModule,
  HttpClientModule,
  FormsModule,
  TooltipModule.forRoot(),
  SharedModule,
  ModalModule.forRoot(),
  SvgIconsModule.forRoot(),
  PopoverModule,
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class CompaniesModule {}
