import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter
} from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  // Lo que debemos decirle al EventEmitter es que nosotros queremos transmitirle el producto que se está agregando 
  // Por eso se le coloca Product
  @Output() addedProduct = new EventEmitter<Product>();
  
  constructor() { }

  onAddToCart() {
    // emit() - para emitir el producto
    // ahora podemos escuchar el evento addedProduct en nuestro padre 
    this.addedProduct.emit(this.product);
  }
}
