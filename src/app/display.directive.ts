import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appDisplay]',
})
export class DisplayDirective implements OnChanges {
  @Input() input: string;
  constructor(private elementRef: ElementRef<HTMLDivElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.input.length > 16)
      this.elementRef.nativeElement.style.fontSize = '2rem';
    else if (this.input.length > 13)
      this.elementRef.nativeElement.style.fontSize = '3rem';
    else if (this.input.length > 10)
      this.elementRef.nativeElement.style.fontSize = '4rem';
    else this.elementRef.nativeElement.style.fontSize = '5rem';
  }
}
