import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Páginas
import { LayoutComponent } from './website/components/layout/layout.component';
import { HomeComponent } from './website/pages/home/home.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { CategoryComponent } from './website/pages/category/category.component';
import { MycartComponent } from './website/pages/mycart/mycart.component';
import { LoginComponent } from './website/pages/login/login.component';
import { RegisterComponent } from './website/pages/register/register.component';
import { RecoveryComponent } from './website/pages/recovery/recovery.component';
import { ProfileComponent } from './website/pages/profile/profile.component';
import { ProductDetailComponent } from './website/pages/product-detail/product-detail.component';
const routes: Routes = [
  // Acá se escriben las rutas
  {
    path: '',
    component: LayoutComponent,
    // Tendrá hijos que serán las páginas
    children: [
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
    ]
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
