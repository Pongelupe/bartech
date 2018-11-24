import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { VendaService } from 'src/app/venda/service/venda.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Produto } from 'src/app/core/model/produto';
import { take } from 'rxjs/operators';
import { ItemVenda } from 'src/app/core/model/itemVenda';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.scss']
})
export class AdicionarProdutoComponent implements OnInit, AfterViewInit {

  addForm: FormGroup;
  @Input() produto: Produto;
  @Input() idVenda: string;
  @Output() itemAddedEvent = new EventEmitter<{ item: ItemVenda, quantidade: number }>();

  constructor(
    private vendaService: VendaService,
    private formBuilder: FormBuilder,
    private ngxSmartModalService: NgxSmartModalService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      quantidade: [1, [Validators.min(1), Validators.required]]
    });

  }

  ngAfterViewInit() {
    this.ngxSmartModalService.getModal('addModal').onOpen
      .subscribe(modal => {
        if (this.produto.codigo === 0) {
          setTimeout(() => {
            console.log(this.produto);
            if (this.produto.temControleEstoque) {
              this.addForm.controls['quantidade']
                .setValidators([Validators.min(1), Validators.required, Validators.max(this.produto.quantidadeEstoque)]);
            }
          }, 1500);
        } else if (this.produto.temControleEstoque) {
          this.addForm.controls['quantidade']
            .setValidators([Validators.min(1), Validators.required, Validators.max(this.produto.quantidadeEstoque)]);
        }
      });
  }

  addItem() {
    const quantidade = parseInt(this.addForm.value['quantidade'], 0);
    this.vendaService.adicionarItemVenda(quantidade,
      this.produto.id, this.idVenda,
      this.produto.quantidadeEstoque, this.produto.temControleEstoque)
      .pipe(take(1))
      .subscribe(
        item => {
          this.itemAddedEvent.emit({ item, quantidade });
          this.close();
        },
        err => this.toastrService.error(err.message, 'Erro'));
  }

  close(): void {
    this.addForm.reset();
    this.ngxSmartModalService.getModal('addModal').close();
  }

}
