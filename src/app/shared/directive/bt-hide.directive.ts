import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appBtHide]'
})
export class BtHideDirective implements OnChanges {

  element: ElementRef;
  @Input() onSmall: boolean;
  @Input() onMedium: boolean;
  @Input() onLarge: boolean;

  constructor(element: ElementRef) {
    this.element = element;
  }

  processElement() {
    if (this.onSmall) {
      this.element.nativeElement.classList.add('d-none');
      this.element.nativeElement.classList.add('d-sm-none');
      this.element.nativeElement.classList.add('d-md-block');
    } else {
      this.element.nativeElement.classList.remove('d-none');
      this.element.nativeElement.classList.remove('d-sm-none');
      this.element.nativeElement.classList.remove('d-md-block');
    }

    if (this.onMedium) {
      this.element.nativeElement.classList.add('d-md-none');
      this.element.nativeElement.classList.remove('d-md-block');
      this.element.nativeElement.classList.add('d-lg-block');
    } else {
      this.element.nativeElement.classList.remove('d-md-none');
      this.element.nativeElement.classList.remove('d-lg-block');
    }

    if (this.onLarge) {
      this.element.nativeElement.classList.add('d-lg-none');
      this.element.nativeElement.classList.remove('d-lg-block');
    } else {
      this.element.nativeElement.classList.remove('d-lg-none');
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    if (this.element.nativeElement.id != null && this.element.nativeElement.id.length > 0) {
      console.log('Processing ', this.element.nativeElement.id);
      console.log('onSmall: ', this.onSmall);
    }
    this.processElement();
  }

  ngOnChanges(changes) {
    this.processElement();
  }

}
