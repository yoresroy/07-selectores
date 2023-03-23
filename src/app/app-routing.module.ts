import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPagesComponent } from './paises/pages/selector-pages/selector-pages.component';

const routes: Routes = [
  { 
    path:'selector', 
    loadChildren: ()=> import('./paises/paises.module').then( m => m.PaisesModule),
  },
  {
    path:'**',
    redirectTo: 'selector'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
