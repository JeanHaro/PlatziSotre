import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  // Calcularemos cuanto tiempo ha pasado
  transform(value: Date): string {
    // new Date - fecha actual
    // vaLue - la fecha que manda el usuario
    return formatDistance(new Date, value);
  }

}
