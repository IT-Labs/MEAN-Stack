import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { LayoutsModule } from './layouts/layouts.module';

const DECLARATIONS = [AppComponent, AppComponent];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientModule,
  FormsModule,
  ComponentsModule,
  LayoutsModule,
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
