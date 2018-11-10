import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../service/venda.service';
import { Observable } from 'rxjs';
import { Produto } from '../../../core/model/produto';

@Component({
  selector: 'app-gerencia-produtos',
  templateUrl: './gerencia-produtos.component.html',
  styleUrls: ['./gerencia-produtos.component.scss']
})
export class GerenciaProdutosComponent implements OnInit {
  produtos$: Observable<Produto[]>;
  termoPesquisaProduto: string;

  constructor(private vendaService: VendaService) { }

  ngOnInit() {
    this.produtos$ = this.vendaService.getAllProdutos();
  }

}
