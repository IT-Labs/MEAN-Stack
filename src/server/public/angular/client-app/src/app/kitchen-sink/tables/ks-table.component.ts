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
  @Input() hasAccounts: boolean = false;
  @Input() hasAdd: boolean = false;
  @Input() hasDelete: boolean = false;
  @Input() hasEdit: boolean = false;
  @Output() addAccount = new EventEmitter<any>();
  @Output() companyAccounts = new EventEmitter<number>();
  @Output() editItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();
}
