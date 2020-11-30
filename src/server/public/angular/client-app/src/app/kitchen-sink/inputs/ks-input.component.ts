import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ks-input',
  templateUrl: './ks-input.component.html',
})
export class KsInputComponent {
  @Input() type: string;
  @Input() name: string;
  @Input() id: string;
  @Input() placeholder: string;

  formControl: FormControl = new FormControl();
}
