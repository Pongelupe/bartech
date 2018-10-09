import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemVenda } from '../../../../core/model/itemVenda';

@Component({
  selector: 'app-itens-venda',
  templateUrl: './itens-venda.component.html',
  styleUrls: ['./itens-venda.component.scss']
})
export class ItensVendaComponent {

  @Input() itens: ItemVenda[];
  @Output() itemRemoved = new EventEmitter<ItemVenda>();

  deleteItem(item: ItemVenda): void {
    this.itens = this.itens.filter(it => item.id !== it.id);
    this.itemRemoved.emit(item);
  }

}
