import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../service/venda.service';
import { Observable } from 'rxjs';
import { Produto } from '../../../core/model/produto';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-gerencia-produtos',
  templateUrl: './gerencia-produtos.component.html',
  styleUrls: ['./gerencia-produtos.component.scss']
})
export class GerenciaProdutosComponent implements OnInit {
  produtos: Produto[];
  produto: Produto;
  termoPesquisaProduto: string;

  constructor(private vendaService: VendaService, private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.vendaService.getAllProdutos().subscribe(res => this.produtos = res);
  }

  openModalProduto(): void {
    this.produto = new Produto();
    this.ngxSmartModalService.getModal('produtoModal').open();
  }

  fecharModal(): void {
    this.ngxSmartModalService.getModal('produtoModal').close();
  }

  novoProdutoCadastrado(produto: Produto) {
    this.produtos = [...this.produtos, produto];
    this.fecharModal();
  }
}
