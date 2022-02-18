import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext, 
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
// Nos deja correr un proceso sin tener que modificar o cambiar en algo la respuesta que envia el observable 
import { tap } from 'rxjs/operators'

// Un contexto para decirle en que momento debe correr en el interceptor
// Es una instancia de HttpContext que tendrá un boolean, por defecto esta en false
const CHECK_TIME = new HttpContextToken<boolean>(() => false);

// Habilitar el contexto
export function checkTime() {
  // set() para enviar al check_time con su valor que le habilita
  return new HttpContext().set(CHECK_TIME, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Si ejecutamos o no tenemos que ejecutar la logica de negocio en este caso
    if (request.context.get(CHECK_TIME)) {
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
    
    return next.handle(request);
  }
}
