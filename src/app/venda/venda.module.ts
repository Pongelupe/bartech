import { NgModule } from '@angular/core';
import { VendaComponent } from './components/venda/venda.component';
import { SharedModule } from '../shared/shared.module';
import { VendaRoutingModule } from './venda-routing.module';
import { PenduraComponent } from './components/pendura/pendura.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { ProdutoPipe } from './pipes/produto.pipe';
import { ItensVendaComponent } from './components/venda/itens-venda/itens-venda.component';

@NgModule({
  imports: [
    SharedModule,
    VendaRoutingModule
  ],
  declarations: [VendaComponent, PenduraComponent, PagarComponent, ProdutoPipe, ItensVendaComponent]
})
export class VendaModule { }
