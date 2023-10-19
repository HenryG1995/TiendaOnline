import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]*$/; // Expresión regular para números

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
      input.dispatchEvent(new Event('input'));
    }
  }

}
