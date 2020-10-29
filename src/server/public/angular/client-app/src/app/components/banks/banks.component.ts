import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BankService } from 'src/app/services/bank.service';
import { Router } from '@angular/router';
import { BankModel } from 'src/app/models/bank-model';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css'],
})
export class BanksComponent implements OnInit {
  banks: BankModel[] = [];
  items: any = [];
  total: number = 0;
  loading: boolean = false;
  keyword: string = '';
  searchTerm: string = '';

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
        this.search();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  addBank() {
    this.router.navigate(['/banks/new']);
  }

  editBank(id) {
    this.router.navigate(['/banks', id]);
  }

  deleteBank(id) {
    console.log('Delete bank');
    let bank = this.banks.find((item) => item._id === id);

    if (confirm('Are you sure to delete bank ' + bank.name + ' ?')) {
      this.bankService.delete(id).subscribe(
        (data: BankModel) => {
          let list = this.banks.filter((item) => item._id !== id);
          this.banks = list;
          this.total = this.banks.length;
          this.loading = false;
          this.search();
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
        }
      );
    }
  }

  search(): void {
    let term = this.searchTerm;
    this.items = this.banks.filter((tag) => {
      if (tag.name) return tag.name.indexOf(term) >= 0;
      else return false;
    });
    this.total = this.items.length;
  }
}
