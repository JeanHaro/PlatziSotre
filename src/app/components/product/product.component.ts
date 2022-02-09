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
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    price: 0,
    image: '',
    title: '',
    description: '',
    category: '',
  };
  // Lo que debemos decirle al EventEmitter es que nosotros queremos transmitirle el producto que se está agregando 
  // Por eso se le coloca Product
  @Output() addedProduct = new EventEmitter<Product>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart() {
    // emit() - para emitir el producto
    // ahora podemos escuchar el evento addedProduct en nuestro padre 
    this.addedProduct.emit(this.product);
  }
}
