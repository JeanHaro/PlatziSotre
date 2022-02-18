import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicio
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor (private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Enviamos el request original antes de que responda
    request = this.addToken(request);
    
    // Antes de que salga la petición interceptarlo y adjuntar los header en token
    return next.handle(request);
  }

  // Metodo especifico para interceptar la petición antes de que salga
  // Agregar el token
  private addToken (request: HttpRequest<unknown>) {
    // Obtiene el token
    const token = this.tokenService.getToken();

    // Si hay token
    if (token) {
      // Clonamos el request original osea clonar la peticion
      // Guardamos la clonacion
      const authReq = request.clone({
        // Cambiamos los header
        // Modificar la autorizacion
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return authReq;
    }

    // Si no tiene token, no clona nada y lo deja tal cual
    return request;
  }
}
