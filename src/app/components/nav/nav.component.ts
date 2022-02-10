import { Component, OnInit } from '@angular/core';

// Servicios
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;

  constructor (private storeService: StoreService) { }

  ngOnInit(): void {
    // subscribe() - Cada vez que haya un cambio entonces este nos avisará
    this.storeService.myCart$.subscribe(products => {
      // Cada vez que añade a un carrito nos avisará 
      this.counter = products.length;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
