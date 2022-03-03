import { NgModule } from '@angular/core';
// Utiliza la tecnica de PreloadAllModules cuando no se tiene tantos modulos que precargar
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { QuicklinkStrategy } from 'ngx-quicklink';

// Pagina 404
import { NotFoundComponent } from './not-found/not-found.component';

// Servicios
// Estrategia de Preload Personalizada
import { CustomPreloadService } from './services/custom-preload.service';

// Guardian
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    // path inicial
    path: '',
    // Carga el hijo
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      // Para que lo precargue
      preload: true
    }
  },
  {
    path: 'cms',
    canActivate: [ AdminGuard ],
    // Carga el hijo
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
  },
  {
    // ** - cuando no encuentra nada
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  // Activamos la precarga
  imports: [RouterModule.forRoot(routes, {
    // Realiza preload a todo los modulos, todas las páginas
    // preloadingStrategy: PreloadAllModules

    // Realiza preload a las páginas que dimos data, preload: true
    // preloadingStrategy: CustomPreloadService

    // Para que precargue los modulos que están en la vista del usuario
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
