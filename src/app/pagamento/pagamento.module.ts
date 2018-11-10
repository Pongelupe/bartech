import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { BebumComponent } from './components/pendura/bebum/bebum.component';
import { PendurasBebumComponent } from './components/pendura/penduras-bebum/penduras-bebum.component';
import { PenduradoPipe } from './pipes/pendurado.pipe';
import { GerenciaClientesComponent } from './components/gerencia-clientes/gerencia-clientes.component';

@NgModule({
  imports: [
    SharedModule,
    PagamentoRoutingModule
  ],
  declarations: [PagamentoComponent, BebumComponent, PendurasBebumComponent, PenduradoPipe, GerenciaClientesComponent]
})
export class PagamentoModule { }
