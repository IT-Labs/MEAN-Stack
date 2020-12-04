import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure-layout',
  templateUrl: './secure-layout.component.html',
})
export class SecureLayoutComponent {
  isSidebarClosed: boolean = true;

  toggleSidebar(event) {
    this.isSidebarClosed = event;
  }
}
