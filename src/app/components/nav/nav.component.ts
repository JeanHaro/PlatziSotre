import { Component, OnInit } from '@angular/core';

// Servicios
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { CategoriesService } from '../../services/categories.service.ts.service';

// Interfaces
import { User } from '../../models/user.model';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  // token = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor (
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesServices: CategoriesService
  ) { }

  ngOnInit(): void {
    // subscribe() - Cada vez que haya un cambio entonces este nos avisará
    this.storeService.myCart$.subscribe(products => {
      // Cada vez que añade a un carrito nos avisará 
      this.counter = products.length;
    });
    // Llamamos a la función todas las categorias
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.login('Jean@gmail.com', '1212')
    this.authService.logininAndGet('Jean@gmail.com', '1212')
    .subscribe(user => {
      this.profile = user;
    })
  }

  getAllCategories() {
    // Traemos a todas las categorias
    this.categoriesServices.getAll()
    .subscribe(data => {
      // Asignar a nuestro array los datos
      this.categories = data;
    });
  }

}
