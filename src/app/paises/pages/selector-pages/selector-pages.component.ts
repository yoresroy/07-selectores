import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServicesService } from '../../services/paises-services.service';
import { PaisSmall } from '../../interfaces/paises.interface';

import { switchMap, tap } from 'rxjs/operators'

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: ['./selector-pages.component.css']
})
export class SelectorPagesComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    region : [ '', Validators.required ],
    pais : [ '', Validators.required ],
  });

  //Llenar selectores
  regiones : string[] = [];
  paises : PaisSmall[] = [];

  constructor( 
  
    private fb : FormBuilder,
    private paisesServicesService : PaisesServicesService
  
    ){ }

  ngOnInit(): void {
    this.regiones = this.paisesServicesService.regiones;


    //Cuando cambie la región
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
            this.miFormulario.get('pais')?.reset('');
        }),
        switchMap( region => this.paisesServicesService.getPaisesPorRegion( region ) )
      )
      .subscribe( paises => {
        this.paises = paises; 
        console.log(paises)
       });


  }

  guardar(){
    console.log(this.miFormulario);
  }

}
