import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/company-model';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountModel } from 'src/app/models/account-model';
import { BankService } from 'src/app/services/bank.service';
import { BankModel } from 'src/app/models/bank-model';

@Component({
  selector: 'app-company-accounts',
  templateUrl: './company-accounts.component.html',
})
export class CompanyAccountsComponent implements OnInit {
  companyId: string;
  errorMessage: any;
  company: CompanyModel;
  accounts: AccountModel[];
  total: number = 0;

  loading: boolean = false;
  banks: BankModel[];

  form: FormGroup;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private bankService: BankService
  ) {
    const idParam = 'id';

    if (this.avRoute.snapshot.params[idParam]) {
      this.companyId = this.avRoute.snapshot.params[idParam];
    }

    this.form = new FormGroup({
      bankId: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getCompanyDetails();
    this.getBanks();
  }

  getCompanyDetails() {
    this.loading = true;
    this.companyService.getById(this.companyId.toString()).subscribe(
      (data: CompanyModel) => {
        this.company = data as CompanyModel;
        this.accounts = this.company.companyBanks || [];
        this.total = this.accounts.length;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.loading = false;
      }
    );
  }

  getBanks() {
    this.loading = true;

    this.bankService.getAll().subscribe(
      (res: BankModel[]) => {
        this.banks = res;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  addAccount(accountModel: AccountModel) {
    this.loading = true;
    this.companyService
      .companyBankInsert(this.companyId, accountModel)
      .subscribe(
        (data: CompanyModel) => {
          this.form.reset();
          this.getCompanyDetails();
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
        }
      );
  }

  deleteAccount(account: AccountModel) {
    console.log('deleteAccount: ' + account.accountNumber);
    let company = this.accounts.find(
      (item) =>
        item.accountNumber === account.accountNumber &&
        item.bankId === account.bankId
    );

    if (
      confirm(
        'Are you sure to delete account number ' + company.accountNumber + ' ?'
      )
    ) {
      this.companyService
        .companyBankDelete(this.companyId, company.bankId)
        .subscribe(
          (data: CompanyModel) => {
            this.getCompanyDetails();
          },
          (err: HttpErrorResponse) => {
            this.loading = false;
          }
        );
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    let bank = this.form.value['bankId'];

    let accountModel = new AccountModel();
    accountModel.bankId = bank._id;
    accountModel.bankName = bank.name;
    accountModel.accountNumber = this.form.value['accountNumber'];
    accountModel.currency = this.form.value['currency'];
    this.addAccount(accountModel);
  }

  onChange(e) {
    console.log(e.target.value);
  }
}
