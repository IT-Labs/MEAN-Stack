import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BankService } from 'src/app/services/bank.service';
import { Router } from '@angular/router';
import { BankModel } from 'src/app/models/bank-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
})
export class BanksComponent implements OnInit {
  banks: BankModel[] = [];
  items: any = [];
  total: number = 0;
  loading: boolean = false;
  keyword: string = '';
  searchTerm: string = '';
  tableHeadItems = ['Id', 'Name', 'SwiftCode', 'Actions'];
  formGroup: FormGroup = new FormGroup({
    searchCompanies: new FormControl(''),
  });

  constructor(private bankService: BankService, private router: Router) {}

  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    this.loading = true;

    this.bankService.getAll().subscribe(
      (res: BankModel[]) => {
        this.banks = res;
        this.total = this.banks.length;
        this.loading = false;
        this.onSearch();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  editBank(id) {
    this.router.navigate(['/banks', id]);
  }

  deleteBank(id) {
    console.log('Delete bank');
    let bank = this.banks.find(item => item._id === id);

    if (confirm('Are you sure to delete bank ' + bank.name + ' ?')) {
      this.bankService.delete(id).subscribe(
        (data: BankModel) => {
          let list = this.banks.filter(item => item._id !== id);
          this.banks = list;
          this.total = this.banks.length;
          this.loading = false;
          this.onSearch();
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
        }
      );
    }
  }

  onSearch(): void {
    let term = this.searchTerm;
    this.items = this.banks.filter(tag => {
      if (tag.name) return tag.name.indexOf(term) >= 0;
      else return false;
    });
    this.total = this.items.length;
  }
}
