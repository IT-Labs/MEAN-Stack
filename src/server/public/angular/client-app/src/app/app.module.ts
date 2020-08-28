import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/company/company.component';
import { BanksComponent } from './components/banks/banks.component';
import { BankComponent } from './components/bank/bank.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SecureLayoutComponent } from './layouts/secure-layout/secure-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainComponent } from './layouts/main/main.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CompanyAccountsComponent } from './components/company-accounts/company-accounts.component';
//import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompaniesComponent,
    CompanyComponent,
    BanksComponent,
    BankComponent,
    SecureLayoutComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CompanyAccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
