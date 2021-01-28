import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { KsAlertsComponent } from './alerts/ks-alerts.component';
import { KsButtonComponent } from './buttons/ks-button.component';
import { KsInputComponent } from './inputs/ks-input.component';
import { KsModal } from './modal/ks-modal.component';
import { KsTableComponent } from './tables/ks-table.component';

const DECLARATIONS = [
  KsInputComponent,
  KsButtonComponent,
  KsAlertsComponent,
  KsTableComponent,
  KsModal,
];

const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
  SvgIconsModule.forRoot(),
  TooltipModule.forRoot(),
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class KitchenSinkModule {}
