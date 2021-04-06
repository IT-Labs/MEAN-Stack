import { Component, Input } from '@angular/core';

@Component({
  selector: 'ms-button',
  template: `
    <button
      type="{{ type }}"
      name="{{ name }}"
      value="{{ value }}"
      class="{{ class }}"
      [routerLink]="routerLink"
      disabled="{{ disabled }}"
      [ngClass]="{ disabled: disabled }"
    >
      {{ value }}
    </button>
  `,
})
export class MsButtonComponent {
  @Input() type: string;
  @Input() name: string;
  @Input() value: string;
  @Input() class: string;
  @Input() size: string;
  @Input() routerLink: any;
  @Input() disabled: boolean;
}
