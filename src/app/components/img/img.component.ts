import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  OnChanges, 
  AfterViewInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';
  // img - para poder llamarlo desde otro html como el app.component.html
  @Input('img')
  // Se ejecuta si solo si se canmbia el input img
  set changeImg (newImg: string) {
    this.img = newImg;
    console.log('change just img =>', this.img)
    // codigo,
  }
  @Input() alt: string = '';
  // loaded() - nombre de nuestro evento
  /* EventEmitter<> - para que transmita información en este caso 
  tipo string */
  @Output() loaded = new EventEmitter<string>();
  imgDefault = '../../../assets/img/descarga.png';

  counter = 0;
  // Será number y undefined porque no le asignaremos un valor por defecto
  counterFn: number | undefined;

  constructor() { 
    // Antes del render
    console.log('constructor', 'imgValue =>', this.img);
    // No correr cosas asincronas
    // Hacer cosas inmediatas y no asincronas
    // Corre una vez 
  }

  ngOnChanges (changes: SimpleChanges) {
    // Antes y durante del render
    // Actualizando los cambios de los inputs
    // Corre muchas veces 
    // Detectar cambios en los inputs
    console.log('ngOnChanges', 'imgValue =>', this.img);
    // Evaluamos todos los cambios, acá vamos a escuchar todos los inputs 
    console.log('changes', changes);
  }

  ngOnInit(): void {
    // Corre antes del RENDER
    // Podemos correr cosas asincronas, cualquier cosa que podamos esperar en un determinado tiempo
    // Corre una sola vez
    console.log('ngOnInit', 'imgValue =>', this.img);
    this.counterFn = window.setInterval(() => {
      this.counter += 1;
      console.log('run counter');
    }, 1000);
  }

  ngAfterViewInit(): void {
    // Corre después del Render
    // Manejamos los hijos  
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // Se corre solo cuando vayamos a eliminar el componente
    console.log('ngOnDestroy');
    // Borramos el interval
    window.clearInterval(this.counterFn);
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
