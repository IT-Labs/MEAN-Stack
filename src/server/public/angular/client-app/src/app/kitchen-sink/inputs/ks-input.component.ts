import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Output() valueChange = new EventEmitter<string>();

  formControl = new FormControl();

  ngOnInit() {
    this.formControl.valueChanges.subscribe(res => {
      this.valueChange.emit(res);
    });
  }
}
