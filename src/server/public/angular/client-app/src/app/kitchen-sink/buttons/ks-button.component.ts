import { Component, Input } from '@angular/core';

@Component({
  selector: 'ks-button',
  template: `
    <button type="{{ type }}" name="{{ name }}" value="{{ value }}" class="{{ class }}">
      {{ value }}
    </button>
  `,
})
export class KsButtonComponent {
  @Input() type: string;
  @Input() name: string;
  @Input() value: string;
  @Input() class: string;
  @Input() size: string;
}
