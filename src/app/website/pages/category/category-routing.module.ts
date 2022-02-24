import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componente
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    // Cuando se le coloca category, renderiza el componente Category
    // Se le coloca /:id porque quiere recibir un parámetro, un parámetro por URL
    path: ':id',
    component: CategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
