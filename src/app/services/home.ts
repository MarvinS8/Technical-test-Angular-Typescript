import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Home } from '../models/home';

@Injectable({providedIn: 'root'})
  export class HomeService {
  private apiUrl = 'https://restcountries.com/'

  constructor(private http: HttpClient) {}

  getHomes(): Observable<Home[]> {
    return this.http.get<Home[]>(this.apiUrl);
  }
}

