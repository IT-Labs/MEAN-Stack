import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'aside',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  isSidebarClosed: boolean = true;

  sidebarToggle() {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.toggleSidebar.emit(this.isSidebarClosed);
  }
}
