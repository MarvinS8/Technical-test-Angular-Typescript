import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  paises: Country[] = [];
  cargando: boolean = true;
  error: string = '';
  busqueda: string = '';

  // Para la paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 15;

  constructor(private countriesService: CountriesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.cargando = true;
    this.error = '';

    this.countriesService.getAllCountries().subscribe({
      next: (data) => {
        // Ordenar los países por nombre alfabéticamente
        this.paises = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar países:', err);
        this.error = 'Could not load countries. Please try again later.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Filtra los países según la búsqueda
  get paisesFiltrados(): Country[] {
    if (!this.busqueda.trim()) {
      return this.paises;
    }
    const termino = this.busqueda.toLowerCase().trim();
    return this.paises.filter(pais =>
      pais.name.common.toLowerCase().includes(termino) ||
      pais.region.toLowerCase().includes(termino) ||
      (pais.capital && pais.capital[0]?.toLowerCase().includes(termino))
    );
  }

  // Países que se muestran en la página actual
  get paisesPaginados(): Country[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.paisesFiltrados.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.paisesFiltrados.length / this.itemsPorPagina);
  }

  get paginas(): number[] {
    const total = this.totalPaginas;
    // Mostrar máximo 5 páginas
    const inicio = Math.max(1, this.paginaActual - 2);
    const fin = Math.min(total, inicio + 4);
    const arr = [];
    for (let i = inicio; i <= fin; i++) {
      arr.push(i);
    }
    return arr;
  }

  irAPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  // Cuando el usuario escribe en el buscador, resetear a página 1
  onBusquedaCambio(): void {
    this.paginaActual = 1;
  }

  // Helper para obtener las monedas como texto
  getCurrencies(country: Country): string {
    if (!country.currencies) return '-';
    return Object.values(country.currencies)
      .map(c => c.name)
      .join(', ');
  }

  // Formatear número de población con comas
  formatPopulation(num: number): string {
    return num.toLocaleString('en-US');
  }
}
