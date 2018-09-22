import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PenduraComponent } from './components/pendura/pendura.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { VendaPenduraResolver } from './components/pendura/VendaPenduraResolver';
import { VendaComponent } from './components/venda/venda.component';

const routes: Routes = [
  {
    path: '',
    component: VendaComponent
  },
  {
    path: 'pagar',
    component: PagarComponent,
  },
  {
    path: 'pendura/:id',
    component: PenduraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  // providers: [VendaPenduraResolver]
})
export class VendaRoutingModule { }
