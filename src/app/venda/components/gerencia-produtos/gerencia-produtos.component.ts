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
  produtos$: Observable<Produto[]>;
  produto: Produto;
  termoPesquisaProduto: string;

  constructor(private vendaService: VendaService, private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.produtos$ = this.vendaService.getAllProdutos();
  }

  openModalProduto(): void {
    this.produto = new Produto();
    this.ngxSmartModalService.getModal('produtoModal').open();
  }

  fecharModal(): void {
    this.ngxSmartModalService.getModal('clienteModal').close();
  }

}
