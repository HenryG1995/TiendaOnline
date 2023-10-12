import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLettersOnly]'
})
export class LettersOnlyDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const regex = /^[A-ZÀ-ÖØ-öø-ÿ ]*$/; // Expresión regular para letras con acentos y espacios

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^A-ZÀ-ÖØ-öø-ÿ ]/g, ''); // Eliminar caracteres no alfabéticos ni espacios
      input.dispatchEvent(new Event('input'));
    }
  }

}
