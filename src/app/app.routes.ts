import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'countries',
    loadComponent: () =>
      import('./pages/countries/countries.component').then(m => m.CountriesComponent)
  },
  {
    path: 'countries/:code',
    loadComponent: () =>
      import('./pages/country-detail/country-detail.component').then(m => m.CountryDetailComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  // Redirigir rutas no encontradas al home
  {
    path: '**',
    redirectTo: ''
  }
];
