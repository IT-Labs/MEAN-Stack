import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyModel } from 'src/app/models/company-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  companies: CompanyModel[] = [];
  items: any = [];
  total: number = 0;
  loading: boolean = false;
  keyword: string = '';
  searchTerm: string = '';

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.loading = true;

    this.companyService.getAll().subscribe(
      (res: CompanyModel[]) => {
        this.companies = res;
        this.total = this.companies.length;
        this.loading = false;
        this.search();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  addCompany() {
    this.router.navigate(['/companies/new']);
  }

  editCompany(id) {
    this.router.navigate(['/companies', id]);
  }

  deleteCompany(id) {
    console.log('Delete company');
    let company = this.companies.find((item) => item._id === id);

    if (confirm('Are you sure to delete company ' + company.name + ' ?')) {
      this.companyService.delete(id).subscribe(
        (data: CompanyModel) => {
          let list = this.companies.filter((item) => item._id !== id);
          this.companies = list;
          this.total = this.companies.length;
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
    this.items = this.companies.filter((tag) => {
      if (tag.name) return tag.name.indexOf(term) >= 0;
      else return false;
    });
    this.total = this.items.length;
  }
}
