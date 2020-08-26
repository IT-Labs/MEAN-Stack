"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const companies_component_1 = require("./components/companies/companies.component");
const company_component_1 = require("./components/company/company.component");
const login_component_1 = require("./components/login/login.component");
const secure_layout_component_1 = require("./layouts/secure-layout/secure-layout.component");
const bank_component_1 = require("./components/bank/bank.component");
const banks_component_1 = require("./components/banks/banks.component");
exports.routes = [
    {
        path: "",
        pathMatch: "full",
        component: login_component_1.LoginComponent,
    },
    {
        path: "login",
        component: login_component_1.LoginComponent,
        data: { title: "Login" },
    },
    {
        path: "",
        component: secure_layout_component_1.SecureLayoutComponent,
        children: [
            {
                path: "companies",
                component: companies_component_1.CompaniesComponent,
                data: {
                    title: "Companies",
                },
            },
            {
                path: "companies/:id",
                component: company_component_1.CompanyComponent,
                data: {
                    title: "Company",
                },
            },
            {
                path: "companies/new",
                component: company_component_1.CompanyComponent,
                data: {
                    title: "Company",
                },
            },
            {
                path: "banks",
                component: banks_component_1.BanksComponent,
                data: {
                    title: "Banks",
                },
            },
            {
                path: "banks/:id",
                component: bank_component_1.BankComponent,
                data: {
                    title: "Bank",
                },
            },
            {
                path: "banks/new",
                component: bank_component_1.BankComponent,
                data: {
                    title: "Bank",
                },
            }
        ]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(exports.routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map