import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
    //inputElement.dispatchEvent(new Event('input'));
  }
  constructor() { }

}
