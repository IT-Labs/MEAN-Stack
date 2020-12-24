import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { KitchenSinkModule } from '../kitchen-sink/kitchen-sink.module';
import { LoginComponent } from './login.component';

const DECLARATIONS = [LoginComponent];

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
export class LoginModule {}
