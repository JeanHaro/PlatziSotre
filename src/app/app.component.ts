import { Component } from '@angular/core';
import { User } from './models/user.model';

// Servicios
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  // Si lo va a mostrar
  showImg = true;
  // Inicia el token en nada
  token = '';

  // Link img: https://www.w3schools.com/howto/img_avatar.png

  constructor (
    private AuthService: AuthService,
    private UsersService: UsersService
  ) {

  }

  // recibir un evento
  onLoaded (img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  // Crear Usuarios
  createUser() {
    this.UsersService.create({
      name: 'Jean',
      email: 'Jean@gmail.com',
      password: '1212'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  // Iniciar sesion
  login() {
    this.AuthService.login('Jean@gmail.com', '1212')
    .subscribe(rta => {
      // Recibir el accesToken
      // console.log(rta.access_token);
      // almacenar el token
      this.token = rta.access_token;
    })
  }

  // Obtener perfil
  getProfile() {
    this.AuthService.profile(this.token)
    .subscribe(profile => {
      console.log(profile);
    });
  }
}
