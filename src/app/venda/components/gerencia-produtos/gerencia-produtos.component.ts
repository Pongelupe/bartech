import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Produto } from '../../../core/model/produto';
import { VendaService } from '../../service/venda.service';
import { ProdutoService } from '../../service/produto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerencia-produtos',
  templateUrl: './gerencia-produtos.component.html',
  styleUrls: ['./gerencia-produtos.component.scss']
})
export class GerenciaProdutosComponent implements OnInit {
  produtos: Produto[];
  produto: Produto;
  termoPesquisaProduto: string;

  constructor(
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private toastrService: ToastrService,
    private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.vendaService.getAllProdutos().subscribe(res => this.produtos = res);
  }

  openModalProduto(): void {
    this.produto = new Produto();
    this.ngxSmartModalService.getModal('produtoModal').open();
  }

  editarProduto(produto: Produto): void {
    this.produto = produto;
    this.ngxSmartModalService.open('produtoModal');
  }

  fecharModal(): void {
    this.produto = null;
    this.ngxSmartModalService.getModal('produtoModal').close();
  }

  novoProdutoCadastrado(produtoVO: { produto: Produto, isEdicao: boolean }) {
    if (produtoVO.isEdicao) {
      this.produtos = this.produtos.filter(p => p.id !== produtoVO.produto.id);
    }
    this.produtos = [...this.produtos, produtoVO.produto];
    this.fecharModal();
  }

  deleteProduto(produto: Produto): void {
    this.produtoService.deleteProduto(produto.id)
      .subscribe(id => {
        this.produtos = this.produtos.filter(p => p.id !== id);
        this.toastrService.success(`Produto ${produto.nome} foi excluído com sucesso!`);
      },
        err => this.toastrService.error(`Produto ${produto.nome} não pode ser excluído!`));
  }
}
