import { Component, OnInit, Input } from '@angular/core';
import { ItemVenda } from '../../../../core/model/itemVenda';

@Component({
  selector: 'app-itens-venda',
  templateUrl: './itens-venda.component.html',
  styleUrls: ['./itens-venda.component.scss']
})
export class ItensVendaComponent implements OnInit {
  @Input() itens: ItemVenda[];
  constructor() { }

  ngOnInit() {
  }

}
