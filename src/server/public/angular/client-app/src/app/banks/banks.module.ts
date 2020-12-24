import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BanksComponent } from './banks/banks.component';
import { BankComponent } from './bank/bank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitchenSinkModule } from '../kitchen-sink/kitchen-sink.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const DECLARATIONS = [BanksComponent, BankComponent];

const MODULES = [
  ReactiveFormsModule,
  CommonModule,
  BrowserModule,
  HttpClientModule,
  FormsModule,
  TooltipModule.forRoot(),
  KitchenSinkModule,
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class BanksModule {}
