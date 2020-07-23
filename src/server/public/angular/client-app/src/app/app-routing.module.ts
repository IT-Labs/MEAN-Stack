import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/company/company.component';
import { LoginComponent } from './components/login/login.component';
import { SecureLayoutComponent } from './layouts/secure-layout/secure-layout.component';


export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login" },
  },
  {
    path: "",
    component: SecureLayoutComponent,
    children: [
      {
        path: "companies",
        component: CompaniesComponent,
        data: {
          title: "Companies",
        },
      },
      {
        path: "companies/:id",
        component: CompanyComponent,
        data: {
          title: "company",
        },
      },
      {
        path: "companies/new",
        component: CompanyComponent,
        data: {
          title: "company",
        },
      }
    ]
  }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
