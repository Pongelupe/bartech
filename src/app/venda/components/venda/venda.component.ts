import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ItemVenda } from '../../../core/model/itemVenda';
import { Produto } from '../../../core/model/produto';
import { Venda } from '../../../core/model/venda';
import { Utils } from '../../../shared/utils';
import { VendaService } from '../../service/venda.service';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})

export class VendaComponent implements OnInit, OnDestroy {

  produtos: Produto[];
  venda: Venda = new Venda();
  termoPesquisaProduto: string;
  produto: Produto = new Produto();
  totalVenda = 0;
  addForm: FormGroup;
  mostrarProdutosCadastrados = true;
  mostrarItens = true;
  private subscriptions: Subscription[] = [];


  constructor(
    private vendaService: VendaService,
    private route: ActivatedRoute,
    private router: Router,
    private ngxSmartModalService: NgxSmartModalService,
    private mesaService: MesaService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.updateShowTabs();
    this.vendaService.getAllProdutos().subscribe(produtos => this.produtos = produtos);
    const vendaId = this.route.snapshot.data.vendaId ? this.route.snapshot.data.vendaId.id : this.route.snapshot.params.id;
    this.vendaService.getVendaDetail(vendaId).subscribe(res => {
      this.venda = Object.assign(Venda.prototype, res);
      this.updateSubtotal();
      this.subscriptions.push(this.mesaService.subscribeToItensVenda(this.venda.mesa.id)
        .subscribe(itemVenda => {
          const modal = this.ngxSmartModalService.getModal('addModal');
          if (modal.isVisible) {
            modal.close();
          }
          this.onItemAdded({ item: itemVenda, quantidade: 1 });
        }));
    }, err => this.toastrService.error(err.message, 'Erro'));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateShowTabs();
  }

  updateShowTabs() {
    if (Utils.isMobile.any()) {
      this.mostrarProdutosCadastrados = true;
      this.mostrarItens = false;
    } else {
      this.mostrarProdutosCadastrados = true;
      this.mostrarItens = true;
    }
  }
  openModalItem(produto: Produto): void {
    this.produto = produto;
    this.ngxSmartModalService.getModal('addModal').open();
  }

  onItemAdded(itemVendaVO: { item: ItemVenda, quantidade: number }) {
    const item = itemVendaVO.item;
    item.produto.quantidadeEstoque -= itemVendaVO.quantidade;
    this.venda.itensVenda = [...this.venda.itensVenda, item];
    this.produtos = this.produtos.filter(p => p.id !== item.produto.id);
    this.produtos = [...this.produtos, item.produto].sort((a, b) => a.codigo - b.codigo);
    this.updateSubtotal();
    this.toastrService.success('Adicionado ' + item.quantidade + 'x ' + item.produto.nome + ' na venda.');
  }

  private updateSubtotal(): void {
    this.totalVenda = 0;
    this.venda.itensVenda.forEach(item => this.totalVenda += item.quantidade * item.produto.preco);
  }

  onItemRemoved(item: ItemVenda): void {
    this.vendaService.removeItem(item)
      .pipe(take(1))
      .subscribe(id => {
        this.venda.itensVenda = this.venda.itensVenda.filter(it => item.id !== it.id);
        this.updateSubtotal();
        this.toastrService.success('Removido ' + item.quantidade + 'x ' + item.produto.nome + ' da venda.');
      },
        err => this.toastrService.error(err.message, 'Erro'));
  }

  cancelVenda(): void {
    this.vendaService.cancelVenda(this.venda)
      .pipe(take(1))
      .subscribe(id => {
        this.toastrService.success('Venda cancelada.');
        this.router.navigate(['']);
      },
        err => {
          this.toastrService.error(err.message, 'Erro');
        });
  }
  encerrarVenda(): void {
    this.router.navigate(['/pagamento', this.venda.id]);
  }
}
