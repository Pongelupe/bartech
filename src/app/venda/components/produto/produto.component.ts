import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../../core/model/produto';

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

  constructor(private formBuilder: FormBuilder) {
    this.produtoForm = this.formBuilder.group({
      nome: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
      codigo: ['', [Validators.minLength(1), Validators.required]],
      codigoDeBarras: ['', [Validators.minLength(8), Validators.maxLength(13)]],
      preco: ['', [Validators.min(0), Validators.required]],
      quantidadeEstoque: ['', [Validators.min(0), Validators.required]]
    });

    if (this.isProductNotNull()) {
      this.setFormDataWithProduct();
    }
  }

  ngOnInit() {
  }

  private isProductNotNull(): boolean { return this.produto !== null && this.produto !== undefined; }

  private setFormDataWithProduct(): void {
    this.produtoForm.setValue({
      nome: this.produto.nome,
      codigo: this.produto.codigo,
      codigoDeBarras: this.produto.codigoDeBarras,
      preco: this.produto.preco,
      quantidadeEstoque: this.produto.quantidadeEstoque
    });
  }

  private cleanFormData(): void {
    this.produto = new Produto();
    this.produto.codigo = null;
    this.produto.preco = null;
    this.produto.quantidadeEstoque = null;
    this.setFormDataWithProduct();
  }

  private cancel(): void {
    this.cancelOperation.emit();
    this.cleanFormData();
  }

  private confirm(): void {
    this.produto = this.produtoForm.value;
  }
}
