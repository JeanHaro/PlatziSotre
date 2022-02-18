import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// Nos deja correr un proceso sin tener que modificar o cambiar en algo la respuesta que envia el observable 
import { tap } from 'rxjs/operators'

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Evalue el tiempo que inicio la peticion
    const start = performance.now()
    return next
    .handle(request)
    .pipe(
      tap(() => {
        // El tiempo que demoro una solicitud
        const time = (performance.now() - start) + 'ms';
        console.log(request.url, time)
      })
    );
  }
}
