import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  OnChanges, 
  AfterViewInit,
  OnDestroy 
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = '';
  // loaded() - nombre de nuestro evento
  /* EventEmitter<> - para que transmita información en este caso 
  tipo string */
  @Output() loaded = new EventEmitter<string>();
  imgDefault = '../../../assets/img/descarga.png';

  constructor() { 
    // Antes del render
    console.log('constructor', 'imgValue =>', this.img);
    // No correr cosas asincronas
    // Hacer cosas inmediatas y no asincronas
    // Corre una vez 
  }

  ngOnChanges() {
    // Antes y durante del render
    // Actualizando los cambios de los inputs
    // Corre muchas veces 
    // Detectar cambios en los inputs
    console.log('ngOnChanges', 'imgValue =>', this.img);
  }

  ngOnInit(): void {
    // Corre antes del RENDER
    // Podemos correr cosas asincronas, cualquier cosa que podamos esperar en un determinado tiempo
    // Corre una sola vez
    console.log('ngOnInit', 'imgValue =>', this.img);
  }

  ngAfterViewInit(): void {
    // Corre después del Render
    // Manejamos los hijos  
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // Se corre solo cuando vayamos a eliminar el componente
    console.log('ngOnDestroy');
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
