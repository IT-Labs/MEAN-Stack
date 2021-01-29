import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyModel } from 'src/app/models/company-model';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsEnum } from '../../shared/alerts.enum';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: CompanyModel[] = [];
  items: any = [];
  total: number = 0;
  loading: boolean = false;
  keyword: string = '';
  modalTitle: string = 'Delete Account';
  modalBody: string;
  company: CompanyModel;
  subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({
    searchCompanies: new FormControl(''),
  });
  AlertsEnum = AlertsEnum;
  tableHeadItems = [
    'Id',
    'Name',
    'Tax Number',
    'Address',
    'City',
    'Zip Code',
    'State',
    'Country',
    'Created',
    'Actions',
  ];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.loading = true;

    this.subscription.add(
      this.companyService.getAll().subscribe(
        (res: CompanyModel[]) => {
          this.companies = res;
          this.total = this.companies.length;
          this.loading = false;
          this.onSearch();
        },
        () => this.toastr.error('Error getting companies info.')
      )
    );
  }

  editCompany(id) {
    this.router.navigate(['/companies', id]);
  }

  companyAccounts(id) {
    this.router.navigate(['/company/' + id + '/accounts']);
  }

  deleteCompany(id, template) {
    this.company = this.companies.find(item => item._id === id);

    this.modalBody = `Are you sure that you want to delete ${this.company.name} account?`;
    this.modalService.show(template);
  }

  deleteItem() {
    this.modalService.hide();
    this.subscription.add(
      this.companyService.delete(this.company._id).subscribe(
        () => this.getCompanies(),
        () => this.toastr.error('Error deleting company info.')
      )
    );
  }

  closeModal() {
    this.modalService.hide();
  }

  onSearch(): void {
    let term: string = '';
    term = this.formGroup.value.searchCompanies;

    this.items = this.companies.filter(tag => {
      if (tag.name) return tag.name.indexOf(term) >= 0;
      else return false;
    });
    this.total = this.items.length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
