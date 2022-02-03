import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string = '';
  // loaded() - nombre de nuestro evento
  /* EventEmitter<> - para que transmita información en este caso 
  tipo string */
  @Output() loaded = new EventEmitter<string>();
  imgDefault = '../../../assets/img/descarga.png';

  constructor() { }

  ngOnInit(): void {
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    // Emitir dicho evento
    // Nos corre si cargo
    this.loaded.emit(this.img);
  }
}
