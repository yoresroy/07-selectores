import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

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

  getPaisPorCodigo( codigo : string ) : Observable<PaisSmall[] > {

    if ( !codigo ) {
      return of([]);
    }

    const url = `${this.baseUrl}/alpha/${codigo}`
    return this.http.get<Pais[]>(url);
  }


  getPaisPorCodigoSmall( codigo : string ) : Observable<PaisSmall> {
    const url = `${this.baseUrl}/alpha/${codigo}?fields=name,cca3`
    return this.http.get<PaisSmall>(url);
  }


  getPaisesPorCodigo( borders : PaisSmall[] ) : Observable<PaisSmall[]> {
    if (!borders) {
      return of([])
    }
  
    const peticiones : Observable<PaisSmall>[] = [];
     
    if (borders.length > 0){
      borders[0].borders?.forEach( codigo => {
        const peticion = this.getPaisPorCodigoSmall(codigo);
        peticiones.push(peticion);
      } );
    }
    

    return combineLatest(peticiones)

  }
  

}
