import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    // split() - para volverlo un array 
    // reverse() - transforma todo al revés
    // join() - para volverlo una cadena 
    return value.split('').reverse().join('');
  }

}
