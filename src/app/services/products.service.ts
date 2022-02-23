import { Injectable } from '@angular/core';
// Esto es un servicio propio de angular para hacer request
// HttpStatusCode - ver el estado de la web
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

// retry - Cuantas veces reintentar una petición
// retryWhen - reintentar cada vez que pase algo
// catchError - para capturar el error
// map - permite realizar operaciones matematicas
import { retry, catchError, map } from 'rxjs/operators'; 

// throwError - Devolver un error
// zip - enviar, juntar o comprimir 2 observadores y recibir las respuestas de los dos al mismo tiempo
import { throwError, zip } from 'rxjs';  

// Interface
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

// Ambientes de produccion y desarrollo
import { environment } from '../../environments/environment';

// Interceptores
// checktime - es el contexto que necesitamos encender
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  // El enlace está en el proxy
  // environment.API_URL - Si el ambiente está en desarrollo, viene el valor en vacío
  // environment.API_URL - Si el ambiente está en producción, viene el enlace 
  private apiUrl = `${environment.API_URL}/api`;

  //  Un servicio que inyecta a otro servicio
  constructor (private http: HttpClient) { }

  getByCategory (categoryId: string, limit?:number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params });
  }

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
    // Si queremos que alguna petición sea evaluada por el TimeInterceptor, tendriamos que enviarle el contexto
    // Se vuelve true el checktime al llamarlo
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
    .pipe(
      retry(3), // Reintentar la petición 3 veces si no encuentra
      // map() - evaluar cada valor que venga del observable
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price // impuestos, no viene del back
        }
      }))  
    );
  }

  // Read y Update
  fetchReadAndUpdate (id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, {title: 'nuevo'})
    )
  }

  // Obtener un producto con el id
  getProduct (id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Si es un error 500, que es un error interno del servidor
        // Mandamos un error de frontend 
        /* if (error.status === 500) */
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo está fallando en el server');
        }

        /* if (error.status === 404) */
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        
        /* if (error.status === 401) */
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }

        return throwError('Ups, algo salió mal');
      })
    )
  }

  // Obtener una cantidad de productos
  getProductsByPage (limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      // Enviar parametros al get
      params: {limit, offset}
    }).pipe(
      // map() - evaluar cada valor que venga del observable
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price // impuestos, no viene del back
        }
      }))
    )
  }

  // Crear productos
  create (dto: CreateProductDTO) {
    // post - retorne un producto, la data que venga es la data que vamos enviar en el cuerpo de la petición para que sea enviado a la API
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  // Actualizar datos
  // Cual es ese producto que queremos actualizar y para ello necesitamos saber el id
  update (id: string, dto: UpdateProductDTO) {
    // put<> - put es para enviar toda la información, aún así si solo hemos cambiado un solo valor
    // patch<> - esto nos sirve para ser la edición de un atributo en particular, si solo cambiamos el nombre, solo enviamos el nombre
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  // Borrar datos
  delete (id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
