import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from 'src/app/services/bank.service';
import { BankModel } from 'src/app/models/bank-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
})
export class BankComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  bankId: string;
  errorMessage: any;
  bank: BankModel;

  constructor(
    private bankService: BankService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
  ) {
    const idParam = 'id';

    if (this.avRoute.snapshot.params[idParam]) {
      this.bankId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group({
      id: this.bankId || '0',
      name: ['', [Validators.required]],
      swiftCode: ['', [Validators.required]],
    });

    this.actionType = this.bankId.toLowerCase() === 'new' ? 'Add' : 'Edit';
  }

  ngOnInit() {
    if (this.actionType === 'Edit') {
      this.bankService.getById(this.bankId.toString()).subscribe(
        (data) => {
          this.bank = data as BankModel;
          this.form.controls['name'].setValue(this.bank.name);
          this.form.controls['swiftCode'].setValue(this.bank.swiftCode);
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

    let bankModel = new BankModel();
    bankModel.name = this.name.value;
    bankModel.swiftCode = this.swiftCode.value;

    if (this.actionType === 'Add') {
      this.bankService.insert(bankModel).subscribe(
        (data) => {
          this.router.navigate(['/banks', data]);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          //this.loading = false;
        }
      );
    }

    if (this.actionType === 'Edit') {
      this.bankService.update(this.bankId, bankModel).subscribe(
        (data) => {
          this.router.navigate(['/banks']);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          //this.loading = false;
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/banks']);
  }

  get name() {
    return this.form.get('name');
  }

  get swiftCode() {
    return this.form.get('swiftCode');
  }
}
