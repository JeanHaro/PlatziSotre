import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OnExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Alerta que recibe un resultado boolean
    // const rta = confirm('Estas seguro de salir?')
    // return rta;

    // Si el componente tiene la función onExit, lo tiene que ejecutar
    // Si no le da un valor predeterminado de true(permitamosle salir)
    return component.onExit ? component.onExit() : true;
  }
  
}
