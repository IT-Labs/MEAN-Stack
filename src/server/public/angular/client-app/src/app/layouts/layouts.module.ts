import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SecureLayoutComponent } from './secure-layout/secure-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/components/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

const DECLARATIONS = [
  SecureLayoutComponent,
  HeaderComponent,
  FooterComponent,
  MainComponent,
  SidebarComponent,
  ProfileDropdownComponent,
];

const MODULES = [CommonModule, RouterModule, SharedModule, PopoverModule, SvgIconsModule.forRoot()];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class LayoutsModule {}
