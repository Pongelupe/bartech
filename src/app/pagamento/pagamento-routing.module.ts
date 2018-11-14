import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { PagamentoResolver } from './components/pagamento/pagamento.resolver';
import { PendurasBebumComponent } from './components/pendura/penduras-bebum/penduras-bebum.component';
import { GerenciaClientesComponent } from './components/gerencia-clientes/gerencia-clientes.component';
import { PenduradetailsComponent } from './components/pendura/penduradetails/penduradetails.component';

const routes: Routes = [
  {
    path: '',
    component: PagamentoComponent
  },
  {
    path: 'pendurados',
    component: PendurasBebumComponent
  },
  {
    path: 'pendurados/details/:idCliente',
    component: PenduradetailsComponent
  },
  {
    path: 'clientes',
    component: GerenciaClientesComponent
  },
  {
    path: ':id',
    component: PagamentoComponent,
    resolve: { vendaId: PagamentoResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [PagamentoResolver],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
