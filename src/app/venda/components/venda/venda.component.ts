import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../../core/model/produto';
import { Venda } from '../../../core/model/venda';
import { VendaService } from '../../service/venda.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  produtos$: Observable<Produto[]>;
  venda: Venda;
  termoPesquisaProduto: string;
  produto: Produto = null;
  quantidade = 1;

  constructor(
    private vendaService: VendaService,
    private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.produtos$ = this.vendaService.getAllProdutos();
    this.venda = new Venda();
    this.venda.id = 'cjmfntolj0xkh0192cwtkl4bm';
  }

  openModalItem(produto: Produto): void {
    this.produto = produto;
    this.ngxSmartModalService.getModal('addModal').open();
  }

  addItemVenda(): void {
    this.vendaService.adicionarItemVenda(this.quantidade, this.produto.id, this.venda.id)
      .subscribe(id => console.log(id));
      this.ngxSmartModalService.getModal('addModal').close();
  }
}
