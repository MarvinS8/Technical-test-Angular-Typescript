import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-API-web',
    templateUrl: './API.html',
    styleUrls: ['./API.css']
})
export class APIComponent implements OnInit {
    countries: any[] = [];
    cargando: boolean = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,capital,currencies')
        .subscribe({
            next:(data)=> {
                this.countries = data;
                this.cargando = false;
            },
            error: (err) => {
                console.error('Error al obtener datos:', err);
                this.cargando = false;
            }
        });
    }
}