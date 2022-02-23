import { Component, Input } from '@angular/core';
// switchMap - para que funcione como un .then
import { switchMap } from 'rxjs/operators';

// Interface
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

// Servicios
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  // Arreglo de Lo que se agrega al carrito
  myShoppingCart: Product[] = [];
  // Cuanto cuesta en total todo lo que está escogiendo al carrito
  total = 0;
  // Recibir datos
  @Input() products: Product[] = [];
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
  };
  // limit = 10; // 10 elementos
  // offset = 0; // Inicie en 0

  // loading - que puede estar cargando
  // success - que todo está bien
  // error - que hubo un error
  // init - estado inicial
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'; 

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

  // Como componente no va hacer la solicitud inicial
  // Lo enviaremos por medio de un Input
  /* ngOnInit(): void {
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
    })
  } */

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
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
      .subscribe(data => {
        // console.log('product', data);
        // this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      }, errorMsg => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      })
  }

  readAndUpdate (id: string) {
    this.productsService.getProduct(id)
    // Apenas obtengamos el producto queremos enviar una actualizacion
    // Esto es un callback hell
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'})),
      // switchMap((product) => this.productsService.update(product.id, {title: 'change'})),
      // switchMap((product) => this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data => {
      console.log(data);
    });
    /* zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, {title: 'nuevo'})
    )
    .subscribe(response => {
      // Primer observador
      const read = response[0];
      // Segundo observador
      const update = response[1];
    }) */
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      // Primer observador
      const read = response[0];
      // Segundo observador
      const update = response[1];
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

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  /* loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset) // Queremos los productos por una página en específico
    .subscribe(data => {
      // concat() - para concatenar un array
      // concatenamos el array que nos llegue de data para que añada más, en vez de sobrescribir
      // Modificamos el array original
      this.products = this.products.concat(data);
      // le damos el valor limit a offset porque es cuanto queremos saltar
      this.offset = this.limit;
    })
  } */
}
