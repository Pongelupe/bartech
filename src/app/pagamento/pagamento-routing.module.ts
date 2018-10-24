import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagamentoComponent } from './components/pagamento/pagamento.component';

const routes: Routes = [
  { path : '',
    component: PagamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
