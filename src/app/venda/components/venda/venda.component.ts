import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../core/model/produto';
import { Venda } from '../../../core/model/venda';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  produtos: Array<Produto> = new Array<Produto>();
  venda: Venda;
  termoPesquisaProduto: string;
  constructor() { }

  ngOnInit() {
    let p = new Produto();
    let p2 = new Produto();
    let p3 = new Produto();

    p.nome = "Cerveja Skol 350 ML";
    p.codigo = 1;
    p.codigoDeBarras = '7891149200504';
    p.preco = 2.37;
    p.quantidadeEstoque = 100;

    p2.nome = "Cerveja Brahma 350 ML";
    p2.codigo = 2;
    p2.codigoDeBarras = '7891149010509';
    p2.preco = 2;
    p2.quantidadeEstoque = 80;

    p3.nome = "Cerveja Brahma Lata 350 ML";
    p3.codigo = 3;
    p3.codigoDeBarras = '7891149145789';
    p3.preco = 20.58;
    p3.quantidadeEstoque = 100;

    this.produtos.push(p);
    this.produtos.push(p2);
    this.produtos.push(p3);
    this.venda = new Venda();
    this.venda.id = '1';
  }

}