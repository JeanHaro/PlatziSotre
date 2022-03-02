import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Páginas
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

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
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: {
          // Para que precargue este enlace
          preload: true,
        }
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
