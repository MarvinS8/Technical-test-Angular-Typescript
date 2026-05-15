import { Component, OnInit, OnDestroy, ViewChild, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';
import type { Map } from 'leaflet';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  pais: Country | null = null;
  cargando: boolean = true;
  error: string = '';

  private mapa: Map | undefined;
  private platformId = inject(PLATFORM_ID);

  // El setter se ejecuta automáticamente cuando el @if muestra u oculta el div
  // Así Leaflet solo corre cuando el elemento ya está en el DOM
  @ViewChild('mapContainer') set mapContainer(el: ElementRef | undefined) {
    if (el && this.pais && !this.mapa) {
      this.iniciarMapa(el.nativeElement);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

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
      },
      error: (err) => {
        console.error('Error al cargar el país:', err);
        this.error = 'Could not load country data. Please go back and try again.';
        this.cargando = false;
      }
    });
  }

  async iniciarMapa(container: HTMLElement): Promise<void> {
    // Leaflet solo funciona en el browser, no en el servidor SSR
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.pais?.latlng || this.pais.latlng.length < 2) return;

    const L = await import('leaflet');

    const lat = this.pais.latlng[0];
    const lng = this.pais.latlng[1];

    // Fix para los iconos rotos de Leaflet con bundlers de Angular
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // Usamos el nativeElement directamente en vez de buscar por ID
    this.mapa = L.map(container).setView([lat, lng], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapa);

    L.marker([lat, lng], { icon: defaultIcon })
      .addTo(this.mapa)
      .bindPopup(`<b>${this.pais.name.common}</b>`)
      .openPopup();
  }

  ngOnDestroy(): void {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = undefined;
    }
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
