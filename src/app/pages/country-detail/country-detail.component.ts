import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  pais: Country | null = null;
  cargando = true;
  error = '';
  esBrowser: boolean;

  private mapa: any = null;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService
  ) {
    this.esBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) this.cargarPais(code);
  }

  ngOnDestroy(): void {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }
  }

  cargarPais(code: string): void {
    this.cargando = true;
    this.error = '';

    this.countriesService.getCountryByCode(code).subscribe({
      next: (data) => {
        this.pais = data[0];
        this.cargando = false;
        this.cdr.detectChanges();

        if (this.esBrowser && this.pais?.latlng?.length >= 2) {
          setTimeout(() => this.iniciarMapa(), 0);
        }
      },
      error: () => {
        this.error = 'Could not load country data. Please go back and try again.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  private async iniciarMapa(): Promise<void> {
    if (!this.pais?.latlng || this.pais.latlng.length < 2) return;

    const L = await import('leaflet');
    const lat = this.pais.latlng[0];
    const lng = this.pais.latlng[1];

    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }

    // Fix default marker icons broken by bundlers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    this.mapa = L.map('country-map').setView([lat, lng], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.mapa);

    L.marker([lat, lng])
      .addTo(this.mapa)
      .bindPopup(`<strong>${this.pais.name.common}</strong>`)
      .openPopup();
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
