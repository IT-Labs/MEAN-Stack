"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const login_component_1 = require("./components/login/login.component");
const companies_component_1 = require("./components/companies/companies.component");
const company_component_1 = require("./components/company/company.component");
const banks_component_1 = require("./components/banks/banks.component");
const bank_component_1 = require("./components/bank/bank.component");
const forms_1 = require("@angular/forms");
const secure_layout_component_1 = require("./layouts/secure-layout/secure-layout.component");
const header_component_1 = require("./layouts/header/header.component");
const footer_component_1 = require("./layouts/footer/footer.component");
const main_component_1 = require("./layouts/main/main.component");
const http_1 = require("@angular/common/http");
const animations_1 = require("@angular/platform-browser/animations");
const forms_2 = require("@angular/forms");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            companies_component_1.CompaniesComponent,
            company_component_1.CompanyComponent,
            banks_component_1.BanksComponent,
            bank_component_1.BankComponent,
            secure_layout_component_1.SecureLayoutComponent,
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            footer_component_1.FooterComponent,
            main_component_1.MainComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.ReactiveFormsModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpClientModule,
            forms_2.FormsModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map