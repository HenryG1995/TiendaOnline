import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNitdirective]'
})
export class NitdirectiveDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const regex = /^(?:\d|CF)[\d\w]*$/; // Expresión regular para la entrada deseada

    if (!regex.test(input.value)) {
      // Reemplaza la entrada con lo que cumple con la expresión regular
      input.value = input.value.replace(/[^0-9cfCF\d\w]/g, '');
      input.dispatchEvent(new Event('input'));
    }
  }
}
