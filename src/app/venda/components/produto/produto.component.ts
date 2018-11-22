import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Operacao } from '../../../core/enum/operacoes.enum';
import { Produto } from '../../../core/model/produto';
import { Utils } from '../../../shared/utils';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit, OnChanges {
  produtoForm: FormGroup;
  @Input() produto: Produto;
  @Output() produtoChange = new EventEmitter<{ produto: Produto, isEdicao: boolean }>();
  @Output() cancelOperation = new EventEmitter();
  @Input() operacaoDesejada: Operacao;
  customPatternProductName = { '0': { pattern: new RegExp('[A-z0-9 ]') } };

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      nome: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
      codigo: ['', [Validators.minLength(1), Validators.required]],
      codigoDeBarras: ['', [Validators.minLength(8), Validators.maxLength(13)]],
      preco: ['', [Validators.min(0), Validators.required]],
      quantidadeEstoque: ['', [Validators.min(0)]],
      temControleEstoque: ['', [Validators.required]]
    });

    this.produtoForm.reset();
    if (this.isProductNotNull()) {
      this.setFormDataWithProduct();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.produto = changes.produto.currentValue;
    if (this.produto && this.produto.codigo) {
      this.setFormDataWithProduct();
      this.produtoForm.controls['codigo'].disable();
    } else {
      if (this.produtoForm) {
        this.produtoForm.controls['codigo'].enable();
      }
    }
  }


  private isProductNotNull(): boolean { return this.produto !== null && this.produto !== undefined; }

  private setFormDataWithProduct(): void {
    this.produtoForm.setValue({
      nome: this.produto.nome,
      codigo: this.produto.codigo,
      codigoDeBarras: this.produto.codigoDeBarras,
      preco: this.produto.preco.toString().replace('.', ','),
      quantidadeEstoque: this.produto.quantidadeEstoque,
      temControleEstoque: this.produto.temControleEstoque
    });
  }

  private cancel(): void {
    this.cancelOperation.emit();
    this.produtoForm.reset();
  }

  private emitProdutoChange(isEdicao: boolean): void {
    this.produtoChange.emit({ produto: this.produto, isEdicao });
    this.produtoForm.reset();
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
        this.emitProdutoChange(false);
      }, err => this.toastrService.error(err.message));
  }

  private confirm(): void {
    const produtoId = this.produto.id ? this.produto.id : '';
    this.produto = this.produtoForm.getRawValue();
    this.produto.id = produtoId;
    this.produto.preco = parseFloat(this.produtoForm.value['preco'].toString().replace(',', '.'));

    this.produtoService.updateOrCreateProduto(this.produto)
      .subscribe(id => {
        this.produto.id = id;
        this.toastrService.success(`Produto ${produtoId ? 'editado' : 'criado'} com sucesso.`);
        this.emitProdutoChange(produtoId !== '');
      });
  }
}
