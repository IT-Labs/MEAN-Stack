import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from 'src/app/services/bank.service';
import { BankModel } from 'src/app/models/bank-model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
})
export class BankComponent implements OnInit, OnDestroy {
  form: FormGroup;
  actionType: string;
  bankId: string;
  errorMessage: any;
  bank: BankModel;
  isSubmited: boolean = false;
  subscription = new Subscription();

  constructor(
    private bankService: BankService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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
      this.subscription.add(
        this.bankService.getById(this.bankId.toString()).subscribe(
          data => {
            this.bank = data as BankModel;
            this.form.controls['name'].setValue(this.bank.name);
            this.form.controls['swiftCode'].setValue(this.bank.swiftCode);
          },
          () => this.toastr.error('Error getting bank info.')
        )
      );
    }
  }

  save() {
    this.isSubmited = true;

    if (!this.form.valid) {
      return;
    }
    let bankModel = new BankModel();
    bankModel.name = this.form.value.name;
    bankModel.swiftCode = this.form.value.swiftCode;

    if (this.actionType === 'Add') {
      debugger;
      this.subscription.add(
        this.bankService.insert(bankModel).subscribe(
          () => this.router.navigate(['/banks']),
          () => this.toastr.error('Error saving bank info.')
        )
      );
    } else if (this.actionType === 'Edit') {
      this.subscription.add(
        this.bankService.update(this.bankId, bankModel).subscribe(
          () => this.router.navigate(['/banks']),
          () => this.toastr.error('Error updating bank info.')
        )
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
