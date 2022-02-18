import { Component, OnInit } from '@angular/core';

// Servicios
import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';

// Interfaces
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor (
    private storeService: StoreService,
    private authService: AuthService
  ) { }

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

  login() {
    this.authService.login('Jean@gmail.com', '1212')
    .subscribe(rta => {
      this.token = rta.access_token;
      console.log(this.token);
      this.getProfile(); // Mejorar
    })
  }

  getProfile() {
    this.authService.profile(this.token)
    .subscribe(user => {
      this.profile = user;
    })
  }

}
