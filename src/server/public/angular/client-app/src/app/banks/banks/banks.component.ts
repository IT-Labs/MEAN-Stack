import { Component, OnDestroy, OnInit } from '@angular/core';
import { BankService } from 'src/app/services/bank.service';
import { Router } from '@angular/router';
import { BankModel } from 'src/app/models/bank-model';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
})
export class BanksComponent implements OnInit, OnDestroy {
  banks: BankModel[] = [];
  items: any = [];
  total: number = 0;
  loading: boolean = false;
  tableHeadItems = ['Id', 'Name', 'SwiftCode', 'Actions'];
  modalTitle: string = 'Delete Bank';
  modalBody: string;
  bank: BankModel;
  subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({
    searchBanks: new FormControl(''),
  });

  constructor(
    private bankService: BankService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    this.loading = true;

    this.subscription.add(
      this.bankService.getAll().subscribe(
        (res: BankModel[]) => {
          this.banks = res;
          this.total = this.banks.length;
          this.loading = false;
          this.onSearch();
        },
        () => this.toastr.error('Error getting banks info.')
      )
    );
  }

  editBank(bankId) {
    this.router.navigate(['/banks', bankId]);
  }

  deleteBank(bankId, modal) {
    this.bank = this.banks.find(item => item._id === bankId);

    this.modalService.show(modal);
    this.modalBody = `Are you sure that you want to delete ${this.bank.name} account?`;
  }

  deleteItem() {
    this.modalService.hide();
    this.subscription.add(
      this.bankService.delete(this.bank._id).subscribe(
        () => this.getBanks(),
        () => this.toastr.error('Error deleting bank.')
      )
    );
  }

  closeModal() {
    this.modalService.hide();
  }

  onSearch(): void {
    let term: string = '';
    term = this.formGroup.value.searchBanks;

    this.items = this.banks.filter(tag => {
      if (tag.name) return tag.name.indexOf(term) >= 0;
      else return false;
    });
    this.total = this.items.length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
