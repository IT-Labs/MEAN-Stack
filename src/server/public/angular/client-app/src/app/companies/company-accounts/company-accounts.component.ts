import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { BankModel } from '../../models/bank-model';
import { CompanyService } from '../../services/company.service';
import { BankService } from '../../services/bank.service';
import { CompanyModel, AccountModel } from '../../models/company-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsEnum } from '../../shared/alerts.enum';

@Component({
  selector: 'app-company-accounts',
  templateUrl: './company-accounts.component.html',
})
export class CompanyAccountsComponent implements OnInit {
  items: any = [];
  companyId: string;
  errorMessage: any;
  company: CompanyModel;
  accounts: AccountModel[];
  total: number = 0;
  banks: BankModel[];
  form: FormGroup;
  subscription = new Subscription();
  AlertsEnum = AlertsEnum;
  tableHeadItems = ['Id', 'Name', 'SwiftCode', 'Actions'];
  modalTitle: string = 'Delete Account';
  modalBody: string;
  bankAcc: BankModel;
  @ViewChild('modal') modal;

  constructor(
    private companyService: CompanyService,
    private avRoute: ActivatedRoute,
    private router: Router,
    private bankService: BankService,
    private modalService: BsModalService
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

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  getCompanyDetails() {
    this.companyService.getById(this.companyId).subscribe(
      (data: CompanyModel) => {
        this.company = data as CompanyModel;
        this.accounts = this.company.companyBanks || [];
        this.total = this.accounts.length;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  getBanks() {
    this.bankService.getAll().subscribe(
      (res: BankModel[]) => {
        this.banks = res;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  addAccount(account) {
    this.companyService.companyBankInsert(this.companyId, account).subscribe(
      () => {
        this.getCompanyDetails();
      },
      (err: HttpErrorResponse) => {}
    );
  }

  deleteAction(account: string) {
    this.bankAcc = this.accounts.find(item => item._id === account);
    this.modalService.show(this.modal);
    this.modalBody = `Are you sure that you want to delete ${this.bankAcc.name} account?`;
  }

  deleteAccount() {
    this.modalService.hide();
    this.accounts.find(item => item._id === this.bankAcc.name);
    this.companyService.companyBankDelete(this.companyId, this.bankAcc._id).subscribe(
      () => {
        this.getCompanyDetails();
      },
      (err: HttpErrorResponse) => {}
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    let bank = this.form.value['bankId'];
    let accountModel = new AccountModel();
    accountModel._id = bank._id;
    accountModel.name = bank.name;
  }

  onChange(e) {
    console.log(e.target.value);
  }

  cancel() {
    this.router.navigate(['/companies']);
  }

  closeModal() {
    this.modalService.hide();
  }
}
