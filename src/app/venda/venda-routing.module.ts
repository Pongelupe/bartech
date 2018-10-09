import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PenduraComponent } from './components/pendura/pendura.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { VendaComponent } from './components/venda/venda.component';
import { VendaResolver } from './components/venda/venda.resolver';

const routes: Routes = [
  {
    path: 'mesa/:id',
    component: VendaComponent,
    resolve: { vendaId: VendaResolver }
  },
  {
    path: ':id',
    component: VendaComponent,
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
  exports: [RouterModule],
  providers: [VendaResolver]
})
export class VendaRoutingModule { }
