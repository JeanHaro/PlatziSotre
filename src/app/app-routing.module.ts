import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Páginas
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  // Acá se escriben las rutas
  {
    // Cuando esté vacío el path o la ruta por defecto
    path: '',
    // Hará una redirección al home
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { 
    // No lo coloco path, para que esté con la ruta por defecto
    // path: '',
    path: 'home',
    component: HomeComponent
  }, 
  {
    // Cuando se le coloca category, renderiza el componente Category
    // Se le coloca /:id porque quiere recibir un parámetro, un parámetro por URL
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    // Se le coloca /:id porque quiere recibir un parámetro, un parámetro por URL
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'my-cart',
    component: MycartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    // ** - cuando no encuentra nada
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
