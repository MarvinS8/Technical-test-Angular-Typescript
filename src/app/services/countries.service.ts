import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  // URL base de la API de países
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  // Trae todos los países con los campos que necesitamos
  getAllCountries(): Observable<Country[]> {
    const fields = 'cca2,name,capital,currencies,flags,population,region,latlng';
    return this.http.get<Country[]>(`${this.baseUrl}/all?fields=${fields}`);
  }

  // Busca un país por su código de 2 letras (cca2)
  getCountryByCode(code: string): Observable<Country[]> {
    const fields = 'cca2,name,capital,currencies,flags,population,region,subregion,latlng,area,languages,timezones';
    return this.http.get<Country[]>(`${this.baseUrl}/alpha/${code}?fields=${fields}`);
  }
}
