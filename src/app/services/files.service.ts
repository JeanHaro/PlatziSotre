import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators'

// Descarga del archivo
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor (private http: HttpClient) { }

  // Nombre del archivo, enlace del archivo, tipo de archivo
  getFile (name: string, url: string, type: string) { 
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      // Cuando el observable nos envie el contenido de la peticion, nos envie algo de logica
      // Recibimos el contenido
      tap(content => {
        // contenido, que tipo es
        const blob = new Blob([content], {type});
        // este es el archivo, es el nombre que tenemos
        saveAs(blob, name);
      }),
      // Una vez me descarga el archivo me devuelve un true o false
      map(() => true)
    )
  }
}
