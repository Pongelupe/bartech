import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagamentoRoutingModule } from './pagamento-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PagamentoRoutingModule
  ],
  declarations: []
})
export class PagamentoModule { }
