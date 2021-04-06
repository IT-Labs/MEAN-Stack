import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BankModel } from '../../models/bank-model';
import { CompanyService } from '../../services/company.service';
import { BankService } from '../../services/bank.service';
import { CompanyModel, AccountModel } from '../../models/company-model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertsEnum } from '../../shared/alerts.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-accounts',
  templateUrl: './company-accounts.component.html',
})
export class CompanyAccountsComponent implements OnInit, OnDestroy {
  items: any = [];
  companyId: string;
  errorMessage: any;
  company: CompanyModel;
  accounts: AccountModel[];
  total: number = 0;
  banks: BankModel[];
  subscription = new Subscription();
  AlertsEnum = AlertsEnum;
  tableHeadItems = ['Id', 'Name', 'SwiftCode', 'Actions'];
  modalTitle: string = 'Delete Account';
  modalBody: string;
  bankAcc: BankModel;

  constructor(
    private companyService: CompanyService,
    private avRoute: ActivatedRoute,
    private router: Router,
    private bankService: BankService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    const idParam = 'id';

    if (this.avRoute.snapshot.params[idParam]) {
      this.companyId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.getCompanyDetails();
    this.getBanks();
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  getCompanyDetails() {
    this.subscription.add(
      this.companyService.getById(this.companyId).subscribe(
        (data: CompanyModel) => {
          this.company = data as CompanyModel;
          this.accounts = this.company.companyBanks || [];
          this.total = this.accounts.length;
        },
        () => this.toastr.error('Error getting company info.')
      )
    );
  }

  getBanks() {
    this.subscription.add(
      this.bankService.getAll().subscribe(
        (res: BankModel[]) => (this.banks = res),
        () => this.toastr.error('Error getting banks info.')
      )
    );
  }

  addAccount(account) {
    let accountExists: string;
    this.accounts.forEach(item => {
      if (item._id === account._id) {
        accountExists = account._id;
        this.toastr.error(`The account for ${account.name} is already added.`);
      }
    });
    if (!accountExists) {
      this.subscription.add(
        this.companyService.companyBankInsert(this.companyId, account).subscribe(
          () => {
            this.getCompanyDetails(), this.toastr.success('New account added');
          },
          () => this.toastr.error('Error with adding the account.')
        )
      );
    }
  }

  deleteAction(accountId: string, modal) {
    this.bankAcc = this.accounts.find(item => item._id === accountId);
    this.modalService.show(modal);
    this.modalBody = `Are you sure that you want to delete ${this.bankAcc.name} account?`;
  }

  deleteItem() {
    this.modalService.hide();
    this.subscription.add(
      this.companyService.companyBankDelete(this.companyId, this.bankAcc._id).subscribe(
        () => this.getCompanyDetails(),
        () => this.toastr.error('Error with deleting the account.')
      )
    );
  }

  closeModal() {
    this.modalService.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
