import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';
import { CompaniesModule } from './companies/companies.module';
import { BanksModule } from './banks/banks.module';
import { LoginModule } from './auth/login.module';
import { SvgIconsModule } from '@ngneat/svg-icon';
import icons from '../assets/svg/svg-icons';
import { ToastrModule } from 'ngx-toastr';

const DECLARATIONS = [AppComponent, AppComponent];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientModule,
  FormsModule,
  CompaniesModule,
  BanksModule,
  LayoutsModule,
  LoginModule,
  ToastrModule.forRoot(),
  SvgIconsModule.forRoot({
    sizes: {
      sm: '20px',
      md: '36px',
      lg: '60px',
    },
    icons,
  }),
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
