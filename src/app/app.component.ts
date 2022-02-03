import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  // Link img: https://www.w3schools.com/howto/img_avatar.png

  // recibir un evento
  onLoaded (img: string) {
    console.log('log padre', img);
  }
}
