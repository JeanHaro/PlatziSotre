import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Interfaces
import { User, CreateUserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // API
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor (
    private http: HttpClient
  ) { }

  // Crear usuario
  create (dto: CreateUserDTO) {
      return this.http.post<User>(this.apiUrl, dto);
  }

  // Obtener todos los usuarios
  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
