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
    frontera : [ '', Validators.required ],
  });

  //Llenar selectores
  regiones : string[] = [];
  paises : PaisSmall[] = [];
  //fronteras : string[] = [];
  fronteras : PaisSmall[] = [];

  //Ui
  cargando : boolean = false;

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
            this.cargando = true;
        }),
        switchMap( region => this.paisesServicesService.getPaisesPorRegion( region ) )
      )
      .subscribe( paises => {
        this.paises = paises; 
        this.cargando = false;
        console.log(paises)
       });


        //Cuando cambie la región
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap( () => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      } ),
      switchMap( codigo => this.paisesServicesService.getPaisPorCodigo(codigo) ),
      switchMap( pais => this.paisesServicesService.getPaisesPorCodigo( pais )) 
    )
    .subscribe( pais => {

      if ( pais && pais?.length > 0 ) {
        this.fronteras = pais;
        console.log( '' + pais)
      } else {
        this.fronteras = [];
      }
      this.cargando = false;
     });


  }

  guardar(){
    console.log(this.miFormulario);
  }

}
