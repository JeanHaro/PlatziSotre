import { Component, OnInit } from '@angular/core';

// Para obtener los parametros de la ruta
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
// Location - para encontrar la ubicación 
import { Location } from '@angular/common';

// Interfaces
import { Product } from '../../../models/product.model';

// Servicio
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  // null por si no encontramos producto
  product: Product | null = null;

  constructor (
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Suscripción a paramMap()
    this.route.paramMap
      .pipe(
        // switchMap - para evitar hacer un Callback hell
        switchMap(params => {
          // Cual es el que queremos obtener, tiene que coincidir con el id
          this.productId = params.get('id');
          // console.log(this.categoryId);

          // Con el ID vamos hacer un request a la API 
          if (this.productId) {
            // Detalle de un producto
            // getOne vamos a un detalle en específico
            return this.productsService.getOne(this.productId);
          } 

          // Si no tiene un id, manda un array vacio
          return [null];
        })
      )
      .subscribe(data => {
        this.product = data;
      });
  }

  goToBack() {
    // location.back() - Función para ir a atrás
    this.location.back();
  }
}
