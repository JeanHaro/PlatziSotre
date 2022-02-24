import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pagina 404
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    // path inicial
    path: '',
    // Carga el hijo
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: 'cms',
    // Carga el hijo
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
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
