import { Component, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'WorldExplorer';

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  constructor() {
    // Cargar el script de Google Maps solo en el browser (no en SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.cargarGoogleMaps();
    }
  }

  private cargarGoogleMaps(): void {
    // Evitar cargar el script más de una vez
    if (this.document.getElementById('google-maps-script')) return;

    const script = this.document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    this.document.head.appendChild(script);
  }
}
