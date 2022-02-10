import { Component, OnInit } from '@angular/core';

// Interface
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model'

// Servicios
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // Arreglo de Lo que se agrega al carrito
  myShoppingCart: Product[] = [];
  // Cuanto cuesta en total todo lo que está escogiendo al carrito
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  }

  // Array de productos
  /* products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: '../../../assets/img/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: '../../../assets/img/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: '../../../assets/img/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: '../../../assets/img/books.jpg'
    },
  ]; */

  constructor (
    private storeService: StoreService,
    private productsService: ProductsService) { 
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // Manejar cosas asincronas
    // subscribe() -> tendremos la información ya lista que hemo traido del API 
    this.productsService.getAllProducts()
    .subscribe(data => {
      // console.log(data); 
      // (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      this.products = data;
    })
  }

  onAddToShoppingCart (product: Product) {
    // Para agregar al array el producto
    // this.myShoppingCart.push(product);
    
    // reduce nos ayudará a sumar todos los precios de cada producto que se va a comprar
    // Todo esto se almacenará en total
    // this.total = this.myShoppingCart.reduce( (sum, item) => sum + item.price, 0);
  
     /* Servicios */
    // Para agregar al array el producto
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
      .subscribe(data => {
        // console.log('product', data);
        this.toggleProductDetail();
        this.productChosen = data;
      })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'bla bla bla',
      images: [''],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      // console.log('created', data);
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Nuevo title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      // En ese array específico pon la nueva actualización
      this.products[productIndex] = data;
    })
  }
}
