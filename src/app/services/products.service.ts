import { Injectable } from '@angular/core';
// Esto es un servicio propio de angular para hacer request
import { HttpClient } from '@angular/common/http';

// Interface
import { Product, CreateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  //  Un servicio que inyecta a otro servicio
  constructor (private http: HttpClient) { }

  getAllProducts() {
    // http.get() - hacer una petición a una URL 
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Obtener un producto con el id
  getProduct (id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crear productos
  create (dto: CreateProductDTO) {
    // post - retorne un producto, la data que venga es la data que vamos enviar en el cuerpo de la petición para que sea enviado a la API
    return this.http.post<Product>(this.apiUrl, dto);
  }
}
