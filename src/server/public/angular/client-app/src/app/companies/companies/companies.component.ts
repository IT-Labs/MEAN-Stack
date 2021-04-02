import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyModel } from 'src/app/models/company-model';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsEnum } from '../../shared/alerts.enum';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Select, Store } from '@ngxs/store';
import { CompanyState } from '../state/comapnies-state';
import { AllCompaniesAction } from '../state/companies-actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit, OnDestroy {
  @Select(CompanyState.companiesSelector) companies$: Observable<any>;
  companies: CompanyModel[] = [];
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
    private toastr: ToastrService,
    private store: Store
  ) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    debugger;
    this.loading = true;
    this.store.dispatch(new AllCompaniesAction());
    this.onSearch();
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
    this.companies$.subscribe(
      res => {
        console.log(this.loading);
        this.companies = res.filter(tag => {
          if (tag.name) return tag.name.indexOf(term) >= 0;
          else return false;
        });
        this.total = this.companies.length;
        this.loading = false;
      },
      () => this.toastr.error('Error getting companies info.')
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
