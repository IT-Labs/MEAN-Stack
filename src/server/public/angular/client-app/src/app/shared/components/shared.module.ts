import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MsAlertsComponent } from './alerts/ms-alerts.component';
import { MsButtonComponent } from './buttons/ms-button.component';
import { MsInputComponent } from './inputs/ms-input.component';
import { MsModal } from './modal/ms-modal.component';
import { MsTableComponent } from './tables/ms-table.component';

const DECLARATIONS = [
  MsInputComponent,
  MsButtonComponent,
  MsAlertsComponent,
  MsTableComponent,
  MsModal,
];

const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
  SvgIconsModule.forRoot(),
  TooltipModule.forRoot(),
  RouterModule,
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class SharedModule {}
