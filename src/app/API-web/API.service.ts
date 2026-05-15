import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class API {
    API_URL:string = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies';
    constructor(private http: HttpClient) {}
    getproducts(): Observable<any[]> {
        return this.http.get<any[]>(this.API_URL).pipe(res=>res);
    }
}