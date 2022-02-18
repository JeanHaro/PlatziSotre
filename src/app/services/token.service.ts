import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken (token: string) {
    // Guardamos el token
    localStorage.setItem('token', token);
  }

  getToken() {
    // Obtenemos el token
    const token = localStorage.getItem('token');
    return token;
  }
}
