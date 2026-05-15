import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [RouterLink, GoogleMap, MapMarker],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit {
  pais: Country | null = null;
  cargando: boolean = true;
  error: string = '';

  // Solo renderizamos el mapa en el browser, no en el servidor
  esBrowser: boolean;

  // Configuración del mapa
  center: google.maps.LatLngLiteral = { lat: 20, lng: 0 };
  zoom = 4;
  markerPosition: google.maps.LatLngLiteral = { lat: 20, lng: 0 };
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
  };

  private platformId = inject(PLATFORM_ID);

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService,
    private cdr: ChangeDetectorRef
  ) {
    this.esBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.cargarPais(code);
    }
  }

  cargarPais(code: string): void {
    this.cargando = true;
    this.error = '';

    this.countriesService.getCountryByCode(code).subscribe({
      next: (data) => {
        this.pais = data[0];
        this.cargando = false;

        // Actualizar las coordenadas del mapa con los datos del país
        if (this.pais?.latlng && this.pais.latlng.length >= 2) {
          const lat = this.pais.latlng[0];
          const lng = this.pais.latlng[1];
          this.center = { lat, lng };
          this.markerPosition = { lat, lng };
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el país:', err);
        this.error = 'Could not load country data. Please go back and try again.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCurrencies(): string {
    if (!this.pais?.currencies) return '-';
    return Object.values(this.pais.currencies)
      .map(c => `${c.name} (${c.symbol})`)
      .join(', ');
  }

  getLanguages(): string {
    if (!this.pais?.languages) return '-';
    return Object.values(this.pais.languages).join(', ');
  }

  formatPopulation(num: number): string {
    return num.toLocaleString('en-US');
  }
}
