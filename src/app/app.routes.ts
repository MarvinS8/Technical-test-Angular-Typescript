import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'countries',
    loadComponent: () =>
      import('./pages/countries/countries').then(m => m.CountriesComponent)
  },
  {
    path: 'countries/:code',
    loadComponent: () =>
      import('./pages/country-detail/country-detail').then(m => m.CountryDetailComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then(m => m.ContactComponent)
  },
  // Redirigir rutas no encontradas al home
  {
    path: '**',
    redirectTo: ''
  }
];
