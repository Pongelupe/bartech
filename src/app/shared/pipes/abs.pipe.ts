import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {

  transform(value: number): number {
    return isNaN(value) ? 0 : Math.abs(value);
  }

}
