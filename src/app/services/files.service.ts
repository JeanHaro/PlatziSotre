import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators'

// Descarga del archivo
import { saveAs } from 'file-saver';

// Environment
import { environment } from 'src/environments/environment';

// Tipado
interface File {
  originalname: string;
  // Nombre del archivo
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.API_URL}/api/files`;

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

  // Subir archivo
  uploadFile (file: Blob) {
    // Enviamos como un tipo formData() -> adjuntar archivos
    const dto = new FormData();
    // Como espera recibir el archivo
    dto.append('file', file);

    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      /* Opcional de acuerdo al backend
        headers: {
          'Content-type': 'multipart/form-data'
        } 
      */
    });
  }
}
