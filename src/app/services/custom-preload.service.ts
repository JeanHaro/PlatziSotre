import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Implementar PreloadingStrategy
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  // La función también debe retornar un observable de tipo any
  preload (route: Route, load: () => Observable<any>): Observable<any> {
    // Cual ruta precargar
    // Queremos ir a la ruta de una data
    // Y si en esa data está habilitado una opción llamada preload
    // Retornamos un metodo load()
    if (route.data && route.data['preload']) {
      return load();
    }

    // Si no, mandamos un observable en vacio
    return of(null);
  }
}
