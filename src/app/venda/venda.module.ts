import { NgModule } from '@angular/core';
import { VendaComponent } from './components/venda/venda.component';
import { SharedModule } from '../shared/shared.module';
import { VendaRoutingModule } from './venda-routing.module';
import { ProdutoPipe } from './pipes/produto.pipe';
import { ItensVendaComponent } from './components/venda/itens-venda/itens-venda.component';

@NgModule({
  imports: [
    SharedModule,
    VendaRoutingModule
  ],
  declarations: [VendaComponent, ProdutoPipe, ItensVendaComponent]
})
export class VendaModule { }
