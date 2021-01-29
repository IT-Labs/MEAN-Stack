import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as logLevel from 'loglevel';
import { Subscription } from 'rxjs';
import { CompanyModel } from '../../models/company-model';
import { CompanyService } from '../../services/company.service';
import { ActionType } from '../../models/action-type-model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit, OnDestroy {
  form: FormGroup;
  actionType: string;
  companyId: string;
  errorMessage: any;
  company: CompanyModel;
  isSubmited: boolean = false;
  subscription = new Subscription();

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    const idParam = 'id';

    if (this.avRoute.snapshot.params[idParam]) {
      this.companyId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group({
      id: this.companyId || '0',
      name: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    this.actionType = this.companyId.toLowerCase() === 'new' ? 'Add' : 'Edit';
  }

  ngOnInit() {
    if (this.actionType === ActionType.edit) {
      this.subscription.add(
        this.companyService.getById(this.companyId).subscribe(
          (data: CompanyModel) => {
            this.company = data;
            this.form.controls['name'].setValue(this.company.name);
            this.form.controls['taxNumber'].setValue(this.company.taxNumber);
            this.form.controls['address'].setValue(this.company.address);
            this.form.controls['city'].setValue(this.company.city);
            this.form.controls['zipCode'].setValue(this.company.zipCode);
            this.form.controls['state'].setValue(this.company.state);
            this.form.controls['country'].setValue(this.company.country);
          },
          () => this.toastr.error('Error getting company info')
        )
      );
    }
  }

  save() {
    this.isSubmited = true;
    if (!this.form.valid) {
      return;
    }
    let companyModel = this.form.value;

    if (this.actionType === ActionType.add) {
      delete this.form.value.id;
      this.subscription.add(
        this.companyService.insert(companyModel).subscribe(
          () => this.router.navigate(['/companies']),
          (err: HttpErrorResponse) => {
            logLevel.debug('Error with saving a new company.', err.message);
            this.toastr.error('Error with saving a new company.');
          }
        )
      );
    }

    if (this.actionType === 'Edit') {
      delete this.form.value.id;
      this.subscription.add(
        this.companyService.update(this.companyId, companyModel).subscribe(
          () => this.router.navigate(['/companies']),
          (err: HttpErrorResponse) => {
            logLevel.debug('Error with updating the company.', err.message);
            this.toastr.error('Error with updating the company.');
          }
        )
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
