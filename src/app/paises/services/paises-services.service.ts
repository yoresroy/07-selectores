import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesServicesService {


  //https://restcountries.com/ información  de api
  private baseUrl : string = 'https://restcountries.com/v3.1';

  private _regiones : string[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones() : string[] {
    return [...this._regiones];
  }

  constructor(
    private http: HttpClient
  ) { }

  getPaisesPorRegion( region : string ) : Observable<PaisSmall[]> {
    const url = `${this.baseUrl}/region/${region}?fields=name,cca3`
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo( codigo : string ) : Observable<Pais[] | null> {

    if ( !codigo ) {
      return of(null);
    }

    const url = `${this.baseUrl}/alpha/${codigo}`
    return this.http.get<Pais[]>(url);
  }

}
