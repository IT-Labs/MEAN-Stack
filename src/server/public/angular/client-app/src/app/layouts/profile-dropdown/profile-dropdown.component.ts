import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
})
export class ProfileDropdownComponent {
  constructor(private router: Router) {}

  logOut() {
    this.router.navigate(['./']);
  }
}
