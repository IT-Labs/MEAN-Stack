import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SecureLayoutComponent } from './secure-layout/secure-layout.component';

const DECLARATIONS = [SecureLayoutComponent, HeaderComponent, FooterComponent, MainComponent];

const MODULES = [RouterModule];

const PROVIDERS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS, ...MODULES],
  providers: [...PROVIDERS],
})
export class LayoutsModule {}
