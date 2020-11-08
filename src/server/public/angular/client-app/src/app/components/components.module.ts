import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
// import { ScriptLoader } from '../shared/core/loader/services/script-loader.service';
// import { SvgIconsModule } from '../svg-icons/svg-icons.module';
// import { SvgIconRegistry } from '../svg-icons/svg-icon-registry.service';
import { iconAvatar } from '../../assets/svg/svg-icons';
import { LoginComponent } from './login/login.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { BanksComponent } from './banks/banks.component';
import { BankComponent } from './bank/bank.component';
import { CompanyAccountsComponent } from './company-accounts/company-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  //   SvgIconsModule.forRoot({
  //     sizes: {
  //       xs: '10px',
  //       sm: '12px',
  //       md: '16px',
  //       lg: '20px',
  //     },
  //   }),
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS, ...MODULES],
  providers: [...PROVIDERS],
})
export class ComponentsModule {
  // constructor(private scriptLoader: ScriptLoader, private svgIconRegistry: SvgIconRegistry) {
  //   this.scriptLoader.intlTelInput();
  //   this.svgIconRegistry.register(iconAvatar);
  // }
}
