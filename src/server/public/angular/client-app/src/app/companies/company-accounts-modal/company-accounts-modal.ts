import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BankModel } from '../../models/bank-model';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'company-accounts-modal',
  templateUrl: './company-accounts-modal.html',
})
export class CompanyAccountsModal {
  items: any = [];
  banks: BankModel[] = [];
  tableHeadItems = ['Id', 'Name', 'SwiftCode', 'Actions'];
  subscription = new Subscription();
  @Output() account = new EventEmitter<BankModel>();
  @Output() closeModal = new EventEmitter();

  constructor(private bankService: BankService, private toastr: ToastrService) {}

  ngOnInit() {
    this.subscription.add(
      this.bankService.getAll().subscribe(
        (res: BankModel[]) => {
          this.banks = res;
          this.items = this.banks.filter(tag => {
            if (tag.name) return tag.name.indexOf('') >= 0;
            else return false;
          });
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(`Error with adding a new company.`);
        }
      )
    );
  }

  close() {
    this.closeModal.emit();
  }

  addAccount(event: BankModel) {
    this.account.emit(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
