import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/models/company-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  companyId: string;
  errorMessage: any;
  company: CompanyModel;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
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
    if (this.actionType === 'Edit') {
      this.companyService.getById(this.companyId.toString()).subscribe(
        (data: CompanyModel) => {
          this.company = data as CompanyModel;
          this.form.controls['name'].setValue(this.company.name);
          this.form.controls['taxNumber'].setValue(this.company.taxNumber);
          this.form.controls['address'].setValue(this.company.address);
          this.form.controls['city'].setValue(this.company.city);
          this.form.controls['zipCode'].setValue(this.company.zipCode);
          this.form.controls['state'].setValue(this.company.state);
          this.form.controls['country'].setValue(this.company.country);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          //this.loading = false;
        }
      );
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    let companyModel = new CompanyModel();
    companyModel.name = this.name.value;
    companyModel.taxNumber = this.taxNumber.value;
    companyModel.address = this.address.value;
    companyModel.city = this.city.value;
    companyModel.zipCode = this.zipCode.value;
    companyModel.state = this.state.value;
    companyModel.country = this.country.value;

    if (this.actionType === 'Add') {
      this.companyService.insert(companyModel).subscribe(
        (data) => {
          this.router.navigate(['/companies', data]);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          //this.loading = false;
        }
      );
    }

    if (this.actionType === 'Edit') {
      this.companyService.update(this.companyId, companyModel).subscribe(
        (data) => {
          this.router.navigate(['/companies']);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          //this.loading = false;
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/companies']);
  }

  get name() {
    return this.form.get('name');
  }

  get taxNumber() {
    return this.form.get('taxNumber');
  }

  get address() {
    return this.form.get('address');
  }

  get city() {
    return this.form.get('city');
  }

  get zipCode() {
    return this.form.get('zipCode');
  }

  get state() {
    return this.form.get('state');
  }

  get country() {
    return this.form.get('country');
  }
}
