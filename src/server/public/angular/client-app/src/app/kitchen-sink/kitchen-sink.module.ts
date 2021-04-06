import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { SharedModule } from '../shared/components/shared.module';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { ReactiveFormsModule } from '@angular/forms';

const DECLARATIONS = [KitchenSinkComponent];

const MODULES = [
  CommonModule,
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  SharedModule,
  SvgIconsModule.forRoot(),
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class KitchenSinkModule {}
