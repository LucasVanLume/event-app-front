import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppPhoneMaskDirective } from 'src/app/shared/utils/mask/app-phone-mask.directive';

@Component({
  selector: 'app-phone-input-component',
  templateUrl: './phone-input-component.component.html',
  styleUrls: ['./phone-input-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ]
})
export class PhoneInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = "(00) 00000-0000";
  @Input() label: string = "Telefone";

  value: string = "";
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  disabled = false;

  constructor(private appPhoneMaskDirective: AppPhoneMaskDirective) {}

  onInput(event: Event) {
    let rawValue = (event.target as HTMLInputElement).value;
    this.value = this.appPhoneMaskDirective.applyPhoneMask(rawValue);
    this.onChange(this.value);
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    if (!/[\d]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  writeValue(value: any): void {
    this.value = value ? this.appPhoneMaskDirective.applyPhoneMask(value) : "";
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
