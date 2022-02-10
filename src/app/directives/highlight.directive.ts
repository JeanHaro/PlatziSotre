// ElementRef - para manejar el DOM
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  // HostListener - es un decorador para escuchar eventos de algún elemento
  // mouseenter - cuando entre el mouse
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  // mouseleave - cuando sale el mouse
  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }

  constructor (private element: ElementRef) { 
    // nativeElement - nos devuelve el elemento nativo del HTML 
    // this.element.nativeElement.style.backgroundColor = 'red';
  }

}
