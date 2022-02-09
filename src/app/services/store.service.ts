import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

// injectable - lo que hace es que se pueda inyectar en otros componentes y servicios
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // Arreglo de Lo que se agrega al carrito
  private myShoppingCart: Product[] = [];

  constructor() { }

  addProduct (product: Product) {
    // Para arreglar al array el producto
    this.myShoppingCart.push(product);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce( (sum, item) => sum + item.price, 0);
  }
}
