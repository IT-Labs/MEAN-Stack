import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KsAlertsComponent } from './alerts/ks-alerts.component';
import { KsButtonComponent } from './buttons/ks-button.component';
import { KsInputComponent } from './inputs/ks-input.component';

const DECLARATIONS = [KsInputComponent, KsButtonComponent, KsAlertsComponent];

const MODULES = [ReactiveFormsModule, FormsModule];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class KitchenSinkModule {}
