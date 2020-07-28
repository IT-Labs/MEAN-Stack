import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  companies: any = [];
  items: any = [];
  total: number = 0;
  loading: boolean = false;
  keyword: string = '';
  searchTerm: string = '';

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.getCompanies()
  }

  getCompanies() {
    this.loading = true;

    this.companyService.getAll().subscribe(
      (res: any) => {
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
    //this.getCompanies();
  }

  editCompany(id) {}

  deleteCompany(id) {}

  search(): void {
    let term = this.searchTerm;
    this.items = this.companies.filter((tag) => {
      if (tag.name) 
        return tag.name.indexOf(term) >= 0;
      else 
        return false;
    });
    this.total = this.items.length;
  }
}
