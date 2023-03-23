import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPagesComponent } from './pages/selector-pages/selector-pages.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '' , component: SelectorPagesComponent },
      {path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
