import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vm-error',
  template: '<small class="text-danger d-block">{{ text }}</small>',
  styles: ['']
})
export class VmErrorComponent {

  @Input() text = '';

  constructor() { }

}
