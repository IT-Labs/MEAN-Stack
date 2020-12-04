import { Component, Input } from '@angular/core';

@Component({
  selector: 'ks-input',
  templateUrl: './ks-input.component.html',
})
export class KsInputComponent {
  @Input() type: string;
  @Input() name: string;
  @Input() id: string;
  @Input() value: string = null;
  @Input() placeholder: string;
}
