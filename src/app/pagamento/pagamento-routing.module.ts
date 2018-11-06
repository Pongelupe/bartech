import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { PagamentoResolver } from './components/pagamento/pagamento.resolver';
import { PendurasBebumComponent } from './components/pendura/penduras-bebum/penduras-bebum.component';

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
