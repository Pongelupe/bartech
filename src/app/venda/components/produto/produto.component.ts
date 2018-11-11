import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../../core/model/produto';
import { Observable } from 'rxjs';
import { ProdutoService } from '../../service/produto.service';
import { take } from 'rxjs/operators';
import { INPUT_VALUE_DEFINITION } from 'graphql/language/kinds';
import { Operacao } from '../../../core/enum/operacoes.enum';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  @Input() produto: Produto;
  @Output() produtoChange = new EventEmitter();
  @Output() cancelOperation = new EventEmitter();
  @Input() operacaoDesejada: Operacao;
  customPatternProductName = { '0': { pattern: new RegExp('[A-z0-9 ]') } };

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      nome: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
      codigo: ['', [Validators.minLength(1), Validators.required]],
      codigoDeBarras: ['', [Validators.minLength(8), Validators.maxLength(13)]],
      preco: ['', [Validators.min(0), Validators.required]],
      quantidadeEstoque: ['', [Validators.min(0)]],
      temControleEstoque: ['', [Validators.required]]
    });

    this.cleanFormData();
    if (this.isProductNotNull()) {
      this.setFormDataWithProduct();
    }
  }

  private isProductNotNull(): boolean { return this.produto !== null && this.produto !== undefined; }

  private setFormDataWithProduct(): void {
    this.produtoForm.setValue({
      nome: this.produto.nome,
      codigo: this.produto.codigo,
      codigoDeBarras: this.produto.codigoDeBarras,
      preco: this.produto.preco,
      quantidadeEstoque: this.produto.quantidadeEstoque,
      temControleEstoque: this.produto.temControleEstoque
    });
  }

  private cleanFormData(): void {
    this.produtoForm.setValue({
      nome: null,
      codigo: null,
      codigoDeBarras: null,
      preco: null,
      quantidadeEstoque: null,
      temControleEstoque: true
    });
  }

  private cancel(): void {
    this.cancelOperation.emit();
    this.cleanFormData();
  }

  private emitProdutoChange(): void {
    this.produtoChange.emit(this.produto);
    this.cleanFormData();
  }

  private getProdutoByCodigo(codigo: number): Observable<Produto> {
    return this.produtoService.getProdutoByCodigo(codigo)
      .pipe(take(1));
  }

  private createProduto(): void {
    this.produtoService.createProduto(this.produto)
      .pipe(take(1))
      .subscribe(id => {
        this.produto.id = id;
        this.setFormDataWithProduct();
        this.toastrService.success('Produto cadastrado com sucesso.');
        this.emitProdutoChange();
      }, err => this.toastrService.error(err.message));
  }

  private confirm(): void {
    this.produto = this.produtoForm.value;
    this.produto.preco = parseFloat(this.produtoForm.value['preco'].toString().replace(',', '.'));
    this.produto.codigo = parseInt(this.produtoForm.value['codigo'], 10);
    this.produto.quantidadeEstoque = Utils.isNullUndefinedOrEmpty(this.produto.quantidadeEstoque) ? null :
      parseInt(this.produtoForm.value['quantidadeEstoque'], 10);

    this.getProdutoByCodigo(this.produto.codigo)
      .subscribe(produto => {
        if (produto) {
          if (this.operacaoDesejada !== Operacao.CRIACAO) {
            this.produto = produto;
            this.emitProdutoChange();
          } else {
            this.toastrService.error('O produto já está cadastrado!');
          }

        } else {
          if (this.operacaoDesejada !== Operacao.EDICAO) {
            this.createProduto();
          } else {
            this.toastrService.error('O produto não está cadastrado!');
          }
        }
      });
  }
}
