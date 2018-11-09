import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendaComponent } from './components/venda/venda.component';
import { VendaResolver } from './components/venda/venda.resolver';
import { GerenciaProdutosComponent } from './components/gerencia-produtos/gerencia-produtos.component';

const routes: Routes = [
  {
    path: 'mesa/:id',
    component: VendaComponent,
    resolve: { vendaId: VendaResolver }
  },
  {
    path: 'produtos',
    component: GerenciaProdutosComponent
  },
  {
    path: ':id',
    component: VendaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [VendaResolver]
})
export class VendaRoutingModule { }
