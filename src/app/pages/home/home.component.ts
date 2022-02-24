import { Component, OnInit } from '@angular/core';

// Queremos escuchar la ruta
import { ActivatedRoute } from '@angular/router';

// Interface
import { Product } from '../../models/product.model';

// Servicios
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10; // 10 elementos
  offset = 0; // Inicie en 0
  productId: string | null = null;

  constructor (
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Manejar cosas asincronas
    // subscribe() -> tendremos la información ya lista que hemo traido del API 
    // this.productsService.getAllProducts() // obtenemos todos los productos
    // Primer parametro - Traiga 10 elementos
    // Segundo elemento - Iniciamos en el 0 del array
    // this.productsService.getAllProducts(10, 0) // Obtener todos los productos
    this.productsService.getProductsByPage(10, 0) // Queremos los productos por una página en específico
    .subscribe(data => {
      // console.log(data); 
      // (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      this.products = data;
      this.offset = this.limit;
    });

    // Queremos vigilar los parametros URL
    // paramMap - parametros que vienen en la ruta
    // queryParamMap - parametros tipo query
    this.route.queryParamMap.subscribe(params => {
      // recibe los parametros de los productos
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  onLoadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
