import { NgModule } from '@angular/core';
import { VendaComponent } from './components/venda/venda.component';
import { SharedModule } from '../shared/shared.module';
import { VendaRoutingModule } from './venda-routing.module';
import { PenduraComponent } from './components/pendura/pendura.component';
import { PagarComponent } from './components/pagar/pagar.component';

@NgModule({
  imports: [
    SharedModule,
    VendaRoutingModule
  ],
  declarations: [VendaComponent, PenduraComponent, PagarComponent]
})
export class VendaModule { }
