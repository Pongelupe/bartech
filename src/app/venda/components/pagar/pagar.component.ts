import { Component, OnInit } from '@angular/core';
import { Venda } from '../../../core/model/venda';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {

  venda: Venda;

  constructor() { }

  ngOnInit() {
    this.venda = new Venda();
    this.venda.id = 'melao';
  }

}
