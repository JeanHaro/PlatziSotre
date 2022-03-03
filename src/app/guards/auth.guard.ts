import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Servicios
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( 
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    /* const token = this.tokenService.getToken();
    // Si no existe token
    if (!token) {
      // Navega al enlace
      this.router.navigate(['/home']);
      return false;
    }

    return true;; */

    return this.authService.user$
    .pipe(
      // map() - transformación
      map(user => {
        // Si no hay un usuario
        if (!user) {
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      })
    )
  }
  
}
