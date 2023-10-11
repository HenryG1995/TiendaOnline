import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxlength]'
})
export class MaxlengthDirective {

  @Input() appMaxlength: number = 10; // Valor por defecto de 10

  constructor() {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;

    if (input.value.length > this.appMaxlength) {
      input.value = input.value.slice(0, this.appMaxlength); // Limita la longitud del valor
    }
  }

}
