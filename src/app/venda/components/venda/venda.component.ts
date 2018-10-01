import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
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
  venda: Venda = new Venda();
  termoPesquisaProduto: string;
  produto: Produto = new Produto();
  totalVenda = 0;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private vendaService: VendaService,
    private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.produtos$ = this.vendaService.getAllProdutos();
    this.vendaService.getVendaDetail('cjmfntolj0xkh0192cwtkl4bm').subscribe(res => {
      this.venda = Object.assign(Venda.prototype, res);
      this.venda.itensVenda.forEach(item => this.totalVenda += item.quantidade * item.produto.preco);
    });
    this.addForm = this.formBuilder.group({
      quantidade: ['', [Validators.min(1)]]
    });
  }

  openModalItem(produto: Produto): void {
    this.produto = produto;
    this.ngxSmartModalService.getModal('addModal').open();
  }

  addItemVenda(): void {
    this.vendaService.adicionarItemVenda(this.addForm.value.quantidade, this.produto.id, this.venda.id)
      .subscribe(
        item => {
          this.venda.itensVenda = [...this.venda.itensVenda, item];
          this.addForm.setValue({ quantidade: 1 });
        });
    this.ngxSmartModalService.getModal('addModal').close();
  }
}
