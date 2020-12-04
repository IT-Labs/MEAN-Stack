import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SecureLayoutComponent } from './secure-layout/secure-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import icons from '../../assets/svg/svg-icons';
import { KitchenSinkModule } from '../kitchen-sink/kitchen-sink.module';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [
  SecureLayoutComponent,
  HeaderComponent,
  FooterComponent,
  MainComponent,
  SidebarComponent,
];

const MODULES = [
  CommonModule,
  RouterModule,
  SvgIconsModule.forRoot({
    sizes: {
      sm: '20px',
      md: '36px',
      lg: '60px',
    },
    icons,
  }),
  KitchenSinkModule,
];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS],
  providers: [...PROVIDERS],
})
export class LayoutsModule {}
