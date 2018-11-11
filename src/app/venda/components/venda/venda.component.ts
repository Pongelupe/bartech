import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { Produto } from '../../../core/model/produto';
import { Venda } from '../../../core/model/venda';
import { VendaService } from '../../service/venda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemVenda } from '../../../core/model/itemVenda';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})

export class VendaComponent implements OnInit {

  produtos$: Observable<Produto[]>;
  venda: Venda = new Venda();
  termoPesquisaProduto: string;
  produto: Produto = new Produto();
  totalVenda = 0;
  addForm: FormGroup;
  quantidade = 1;
  mostrarProdutosCadastrados = true;
  mostrarItens = true;


  constructor(
    private formBuilder: FormBuilder,
    private vendaService: VendaService,
    private route: ActivatedRoute,
    private router: Router,
    private ngxSmartModalService: NgxSmartModalService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.updateShowTabs();
    this.produtos$ = this.vendaService.getAllProdutos();
    const vendaId = this.route.snapshot.data.vendaId ? this.route.snapshot.data.vendaId.id : this.route.snapshot.params.id;
    this.vendaService.getVendaDetail(vendaId).subscribe(res => {
      this.venda = Object.assign(Venda.prototype, res);
      this.updateSubtotal();
    }, err => this.toastrService.error(err.message, 'Erro'));
    this.addForm = this.formBuilder.group({
      quantidade: ['', [Validators.min(1), Validators.required]]
    });
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

  addItemVenda(): void {
    this.vendaService.adicionarItemVenda(this.quantidade, this.produto.id, this.venda.id,
      this.produto.quantidadeEstoque, this.produto.temControleEstoque)
      .pipe(take(1))
      .subscribe(
        item => {
          this.venda.itensVenda = [...this.venda.itensVenda, item];
          this.updateSubtotal();
          this.quantidade = 1;
          this.toastrService.success('Adicionado ' + item.quantidade + 'x ' + item.produto.nome + ' na venda.');
        },
        err => this.toastrService.error(err.message, 'Erro'));
    this.ngxSmartModalService.getModal('addModal').close();
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
