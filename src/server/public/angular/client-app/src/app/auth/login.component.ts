import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    let form = this.loginForm.value;
    this.checkCred(form);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  checkCred(form) {
    let user = form.username;
    let pass = form.password;
    if (user === 'admin' && pass === 'P@ssw0rd') {
      this.router.navigate(['/companies']);
      localStorage.setItem('token', 'data.result.token-23842783wjkefkwefkf');
    } else {
      this.toastr.error(`Invalid email or password.`);
    }
  }
}
