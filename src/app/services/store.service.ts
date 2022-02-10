import { Injectable } from '@angular/core';

/* Nos sirve para crear un observable que nos permita crear todo este patron para que otros componentes se puedan suscribir a penas reciba 
un cambio */
import { BehaviorSubject } from 'rxjs'

import { Product } from '../models/product.model';

// injectable - lo que hace es que se pueda inyectar en otros componentes y servicios
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // Arreglo de Lo que se agrega al carrito
  private myShoppingCart: Product[] = [];
  // Le decimos que es un BehaviorSubject, y le decimos que tiene ese behavior y le decimos que tiene un array
  private myCart = new BehaviorSubject<Product[]>([]) 

  // Un observable se caracteriza por tener un signo de pesos al final
  // Cada vez que agreguemos productos a los que estén suscritos puedan recibir esas notificaciones
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct (product: Product) {
    // Para arreglar al array el producto
    this.myShoppingCart.push(product);
    // next() - emitimos un valor, y ese valor va ser la lista actual de la lista de compras
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce( (sum, item) => sum + item.price, 0);
  }
}
