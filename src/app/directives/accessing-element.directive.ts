import { Directive, Renderer2, ElementRef, HostListener, HostBinding, Output } from '@angular/core';

@Directive({
  selector: '[appAccessingElement]'
})
export class AccessingElementDirective {
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') fontColor: string;

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  @HostListener('click', ['$event']) onclick(evt: MouseEvent, ele = this.element.nativeElement) {
    // this.backgroundCOlor = '#f8f9fa';
    // this.fontColor = '#495057';
    // console.log(evt.target);
    // console.log(ele.children[0]);
    // console.log(ele.parentNode.children);
    // console.log((<HTMLElement>(<HTMLElement>evt.target).parentNode));
    // this.renderer.setStyle(ele.firstChild, 'background-color', '#f8f9fa');
    // this.renderer.setStyle(ele.firstChild, 'color', '#495057');
  }

}
