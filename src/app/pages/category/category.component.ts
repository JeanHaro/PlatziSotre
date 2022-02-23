import { Component, OnInit } from '@angular/core';

// ActivatedRoute - Leer parámetros desde el routing
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

// Servicios
import { ProductsService } from '../../services/products.service';

// Interfaces
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  // Si el template del HTML tenemos una sola línea se puede hacer así también 
  /* template: `<app-products [products]="products"></app-products>`, */
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor (
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    // Suscripción a paramMap()
    this.route.paramMap
      .pipe(
        // switchMap - para evitar hacer un Callback hell
        switchMap(params => {
          // Cual es el que queremos obtener, tiene que coincidir con el id
          this.categoryId = params.get('id');
          // console.log(this.categoryId);

          // Con el ID vamos hacer un request a la API 
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          } 

          // Si no tiene un id, manda un array vacio
          return [];
        })
      )
      .subscribe(data => {
        this.products = data;
      });
  }
}
