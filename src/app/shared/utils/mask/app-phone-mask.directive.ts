import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class AppPhoneMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.applyPhoneMask(input.value);
  }

  public applyPhoneMask(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo o que não é número
    if (value.length <= 10) {
      return value.replace(/^(\d{2})(\d{0,5})(\d{0,4})$/, '($1) $2-$3'); // Máscara (XX) XXXXX-XXXX
    }
    return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Máscara para números com 11 dígitos
  }
}
