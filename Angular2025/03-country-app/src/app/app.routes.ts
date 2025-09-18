import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [

  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'country',
    // si no exportamos por default en country.routes.ts
    //loadChildren: () => import('./country/country.routes').then( m => m.countryRoutes )
    loadChildren: () => import('./country/country.routes')
  },
  {
    path: '**',
    redirectTo: '',
  }

];
