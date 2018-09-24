import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../../core/model/produto';
import { Venda } from '../../../core/model/venda';
import { VendaService } from '../../service/venda.service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  produtos$: Observable<Produto[]>;
  venda: Venda;
  termoPesquisaProduto: string;

  constructor(private vendaService: VendaService) { }

  ngOnInit() {

    this.produtos$ = this.vendaService.getAllProdutos();

    // var objVenda = {
    //   "id": 1,
    //   "itensVenda": [
    //     {
    //       "quantidade": 10,
    //       "desconto": 5,
    //       "valor": 2.37,
    //       "produto": {
    //         "preco": 2.37,
    //         "nome": "Cerveja Skol 350 ML",
    //         "codigo": 1,
    //         "codigoDeBarras": "7891149200504",
    //         "quantidadeEstoque": 100
    //       }
    //     },
    //     {
    //       "quantidade": 100,
    //       "desconto": 50,
    //       "valor": 2,
    //       "produto": {
    //         "preco": 2,
    //         "nome": "Cerveja Brahma 350 ML",
    //         "codigo": 2,
    //         "codigoDeBarras": "7891149010509",
    //         "quantidadeEstoque": 80
    //       }
    //     },
    //     {
    //       "quantidade": 1000,
    //       "desconto": 500,
    //       "valor": 20.58,
    //       "produto": {
    //         "preco": 20.58,
    //         "nome": "Cerveja Brahma Lata 350 ML",
    //         "codigo": 3,
    //         "codigoDeBarras": "7891149145789",
    //         "quantidadeEstoque": 100
    //       }
    //     }
    //   ]
    // };

    // let obj = Object.create(Venda.prototype);
    // this.venda = Object.assign(obj, objVenda);

    // this.produtos.push(objVenda.itensVenda[0].produto);
    // this.produtos.push(objVenda.itensVenda[1].produto);
    // this.produtos.push(objVenda.itensVenda[2].produto);

    this.venda = new Venda();
    this.venda.id = 'dawdadaw';

  }

}
