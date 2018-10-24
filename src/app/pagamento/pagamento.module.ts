import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoComponent } from './components/pagamento/pagamento.component';

@NgModule({
  imports: [
    SharedModule,
    PagamentoRoutingModule
  ],
  declarations: [PagamentoComponent]
})
export class PagamentoModule { }
