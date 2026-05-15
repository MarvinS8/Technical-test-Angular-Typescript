import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit {
  pais: Country | null = null;
  cargando: boolean = true;
  error: string = '';

  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

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

  get mapUrl(): SafeResourceUrl {
    if (!this.pais?.latlng || this.pais.latlng.length < 2) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
    const lat = this.pais.latlng[0];
    const lng = this.pais.latlng[1];
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 20},${lat - 15},${lng + 20},${lat + 15}&layer=mapnik&marker=${lat},${lng}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
