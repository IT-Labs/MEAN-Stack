import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { toUnicode } from 'punycode';

@Component({
  selector: 'ks-table',
  templateUrl: './ks-table.component.html',
})
export class KsTableComponent {
  @Input() items: any;
  @Input() tableHeadItems: string[];
  @Input() isBank: boolean = false;
  @Output() companyAccounts = new EventEmitter<number>();
  @Output() editCompany = new EventEmitter<number>();
  @Output() deleteCompany = new EventEmitter<number>();
  @Output() editBank = new EventEmitter<number>();
  @Output() deleteBank = new EventEmitter<number>();
}
