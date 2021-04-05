import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BanksComponent } from './banks/banks.component';
import { BankComponent } from './bank/bank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/components/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { RouterModule } from '@angular/router';

const DECLARATIONS = [BanksComponent, BankComponent];

const MODULES = [
  ReactiveFormsModule,
  CommonModule,
  BrowserModule,
  HttpClientModule,
  FormsModule,
  TooltipModule.forRoot(),
  SharedModule,
  SvgIconsModule.forRoot(),
  RouterModule,
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class BanksModule {}
