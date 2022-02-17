import { Injectable } from '@angular/core';
// Esto es un servicio propio de angular para hacer request
import { HttpClient, HttpParams } from '@angular/common/http';

// retry - Cuantas veces reintentar una petición
// retryWhen - reintentar cada vez que pase algo
import { retry } from 'rxjs/operators'; 

// Interface
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  // El enlace está en el proxy
  private apiUrl = '/api/products';

  //  Un servicio que inyecta a otro servicio
  constructor (private http: HttpClient) { }

  // Para que obtenga todos los productos
  // También para que obtenga una parte de los productos como getProductsByPage
  getAllProducts (limit?: number, offset?: number) {
    // Enviara parametros de forma dinamica
    let params = new HttpParams(); 

    // Si limit y offset es true
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    // http.get() - hacer una petición a una URL 
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3) // Reintentar la petición 3 veces si no encuentra
    );
  }

  // Obtener un producto con el id
  getProduct (id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Obtener una cantidad de productos
  getProductsByPage (limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      // Enviar parametros al get
      params: {limit, offset}
    });
  }

  // Crear productos
  create (dto: CreateProductDTO) {
    // post - retorne un producto, la data que venga es la data que vamos enviar en el cuerpo de la petición para que sea enviado a la API
    return this.http.post<Product>(this.apiUrl, dto);
  }

  // Actualizar datos
  // Cual es ese producto que queremos actualizar y para ello necesitamos saber el id
  update (id: string, dto: UpdateProductDTO) {
    // put<> - put es para enviar toda la información, aún así si solo hemos cambiado un solo valor
    // patch<> - esto nos sirve para ser la edición de un atributo en particular, si solo cambiamos el nombre, solo enviamos el nombre
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  // Borrar datos
  delete (id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
