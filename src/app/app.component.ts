import { Component } from '@angular/core';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  // Si lo va a mostrar
  showImg = true;

  // Link img: https://www.w3schools.com/howto/img_avatar.png

  // recibir un evento
  onLoaded (img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
