import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // La ruta con parámetro dinámico se renderiza en el servidor por request
  {
    path: 'countries/:code',
    renderMode: RenderMode.Server
  },
  // El resto se puede prerender
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
