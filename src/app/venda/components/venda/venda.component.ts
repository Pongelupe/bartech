import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../../core/model/produto';
import { Venda } from '../../../core/model/venda';
import { VendaService } from '../../service/venda.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ItemVenda } from '../../../core/model/itemVenda';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  produtos$: Observable<Produto[]>;
  venda: Venda = new Venda();;
  termoPesquisaProduto: string;
  produto: Produto = new Produto();
  quantidade = 1;
  totalVenda: number = 0;

  constructor(
    private vendaService: VendaService,
    private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.produtos$ = this.vendaService.getAllProdutos();
    this.vendaService.getVendaDetail('cjmfntolj0xkh0192cwtkl4bm').subscribe(res => {
      this.venda = Object.assign(Venda.prototype, res);
      this.venda.itensVenda.forEach(item => this.totalVenda += item.quantidade * item.produto.preco);
    });
  }

  openModalItem(produto: Produto): void {
    this.produto = produto;
    this.ngxSmartModalService.getModal('addModal').open();
  }

  addItemVenda(): void {
    this.vendaService.adicionarItemVenda(this.quantidade, this.produto.id, this.venda.id)
      .subscribe(
        id => {
          let item: ItemVenda = new ItemVenda();
          item.produto = this.produto;
          item.quantidade = this.quantidade;
          item.venda = this.venda;
          item.valor = this.produto.preco;
          if (this.venda.itensVenda == undefined)
            this.venda.itensVenda = new Array<ItemVenda>();
            
          this.venda.itensVenda.push(item);
        });
    this.ngxSmartModalService.getModal('addModal').close();
  }
}
