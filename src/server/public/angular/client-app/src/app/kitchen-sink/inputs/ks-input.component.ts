import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ks-input',
  templateUrl: './ks-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => KsInputComponent),
    },
  ],
})
export class KsInputComponent implements ControlValueAccessor {
  @Input() type: string;
  @Input() name: string;
  @Input() id: string;
  @Input() placeholder: string;
  @Input() formControl = new FormControl('');

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(obj: any): void {
    const companyName = String(obj);
    this.formControl.setValue(companyName);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  doInput() {
    this.onChange(this.formControl.value);
  }

  doBlur() {
    this.onTouched();
  }
}
