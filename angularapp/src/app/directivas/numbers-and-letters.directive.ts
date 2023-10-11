import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersAndLetters]'
})
export class NumbersAndLettersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const regex = /^[A-Za-z0-9 ]*$/; // Expresión regular para letras y números

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^A-Za-z0-9 ]/g, ''); // Eliminar caracteres no alfanuméricos
      input.dispatchEvent(new Event('input'));
    }
  }

}
