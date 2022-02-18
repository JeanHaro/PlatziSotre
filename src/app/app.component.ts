import { Component } from '@angular/core';
import { User } from './models/user.model';

// Servicios
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

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
  // Imagen para renderizar
  imgRta = '';

  // Link img: https://www.w3schools.com/howto/img_avatar.png

  constructor (
    private AuthService: AuthService,
    private UsersService: UsersService,
    private FileService: FilesService
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
    // this.AuthService.getProfile(this.token)
    this.AuthService.getProfile()
    .subscribe(profile => {
      console.log(profile);
    });
  }

  downloadPdf() {
    // nombre que queremos darle al archivo, luego la url, luego que tipo de archivo es
    this.FileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload (event: Event) {
    // Nuestro evento target que es un input
    const element = event.target as HTMLInputElement;
    // Verificar si tiene archivos
    // Ir al item posicion 0
    const file = element.files?.item(0);

    // Si file existe ejecuta esto
    if (file) {
      this.FileService.uploadFile(file)
      // La respuesta
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
  }
}
