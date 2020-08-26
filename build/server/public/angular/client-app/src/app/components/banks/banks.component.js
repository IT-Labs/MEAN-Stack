"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const bank_service_1 = require("src/app/services/bank.service");
const router_1 = require("@angular/router");
let BanksComponent = class BanksComponent {
    constructor(bankService, router) {
        this.bankService = bankService;
        this.router = router;
        this.banks = [];
        this.items = [];
        this.total = 0;
        this.loading = false;
        this.keyword = '';
        this.searchTerm = '';
    }
    ngOnInit() {
        this.getBanks();
    }
    getBanks() {
        this.loading = true;
        this.bankService.getAll().subscribe((res) => {
            this.banks = res;
            this.total = this.banks.length;
            this.loading = false;
            this.search();
        }, (err) => {
            this.loading = false;
        });
    }
    addBank() {
        this.router.navigate(['/banks/new']);
    }
    editBank(id) {
        this.router.navigate(['/banks', id]);
    }
    deleteBank(id) {
        console.log("Delete bank");
        let bank = this.banks.find(item => item._id === id);
        if (confirm("Are you sure to delete bank " + bank.name + " ?")) {
            this.bankService.delete(id)
                .subscribe((data) => {
                let list = this.banks.filter(item => item._id !== id);
                this.banks = list;
                this.total = this.banks.length;
                this.loading = false;
                this.search();
            }, (err) => {
                this.loading = false;
            });
        }
    }
    search() {
        let term = this.searchTerm;
        this.items = this.banks.filter((tag) => {
            if (tag.name)
                return tag.name.indexOf(term) >= 0;
            else
                return false;
        });
        this.total = this.items.length;
    }
};
BanksComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-banks',
        templateUrl: './banks.component.html',
        styleUrls: ['./banks.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof bank_service_1.BankService !== "undefined" && bank_service_1.BankService) === "function" ? _a : Object, router_1.Router])
], BanksComponent);
exports.BanksComponent = BanksComponent;
//# sourceMappingURL=banks.component.js.map