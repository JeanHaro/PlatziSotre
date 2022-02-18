import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Interfaces
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor (
    private http: HttpClient
  ) { }

  // Iniciar sesion
  login (email: string, password: string) {
    // Queremos que nos retorne la interface Auth cuando hagamos el post
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
  }

  // Perfil del usuario
  profile (token: string) {
    return this.http.get(`${this.apiUrl}/profile`)
  }

}
