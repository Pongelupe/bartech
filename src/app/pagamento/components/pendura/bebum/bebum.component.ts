import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cliente } from '../../../../core/model/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { OperacoesBebum } from 'src/app/core/enum/OperacoesBebum.enum';

@Component({
  selector: 'app-bebum',
  templateUrl: './bebum.component.html',
  styleUrls: ['./bebum.component.scss']
})
export class BebumComponent implements OnInit, OnChanges {

  bebumForm: FormGroup;
  @Input() cliente: Cliente;
  @Output() closeModalBebum = new EventEmitter<{ cliente: Cliente, isEdicao: boolean }>();
  @Output() cancelarOperacao = new EventEmitter();
  @Input() hideButtonSearch: false;
  @Input() operacaoDesejada: OperacoesBebum;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.bebumForm = this.formBuilder.group({
      nome: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
      apelido: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
      telefone: ['', [Validators.minLength(11), Validators.maxLength(11)]],
    });

    if (this.isClienteNotNull()) {
      this.setFormDataWithBebum();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cliente = changes.cliente.currentValue;
    if (this.cliente && this.cliente.cpf) {
      this.setFormDataWithBebum();
      this.bebumForm.controls['cpf'].disable();
    } else {
      if (this.bebumForm) {
        this.bebumForm.controls['cpf'].enable();
      }
    }
  }

  private isClienteNotNull(): boolean { return this.cliente !== null && this.cliente !== undefined; }

  public confirmarCliente(): void {
    if (this.operacaoDesejada === OperacoesBebum.Pendura) {
      this.closeModalBebum.emit({ cliente: this.cliente, isEdicao: false });
    } else {
      const clienteId = this.cliente.id ? this.cliente.id : '';
      this.cliente = this.bebumForm.getRawValue();
      this.cliente.id = clienteId;

      this.clienteService.updateOrCreateCliente(this.cliente)
        .subscribe(id => {
          this.cliente.id = id;
          this.toastrService.success(`Cliente ${clienteId ? 'editado' : 'criado'} com sucesso.`);
          this.bebumForm.reset();
          this.close(clienteId !== '');
        });
    }
  }

  private createCliente(): void {
    this.clienteService.createCliente(this.cliente)
      .pipe(take(1))
      .subscribe(id => {
        this.cliente.id = id;
        this.setFormDataWithBebum();
        this.toastrService.success('Cliente cadastrado com sucesso.');
        this.close(false);
      }, err => {
        if (err.graphQLErrors.filter(e => e.code === 3010)) {
          this.toastrService.success('Atenção', 'Bebum selecionado');
          this.close(false);
        } else {
          this.toastrService.error('Atenção', 'CPF já cadastrado!');
        }
      });
  }

  private getBebumByCpf(cpf: string): Observable<Cliente> {
    return this.clienteService.getClienteByCpf(cpf)
      .pipe(take(1));
  }

  retriveBebum(cpf: string): void {
    this.getBebumByCpf(cpf)
      .subscribe(cliente => {
        this.cliente = cliente;
        if (cliente) {
          this.setFormDataWithBebum();
        } else {
          this.toastrService.error('Bebum não encontrado!');
        }
      });
  }

  private setFormDataWithBebum(): void {
    this.bebumForm.setValue({
      nome: this.cliente.nome,
      apelido: this.cliente.apelido,
      cpf: this.cliente.cpf,
      telefone: this.cliente.telefone
    });
  }

  private cleanFormData(): void {
    this.cliente = new Cliente();
    this.setFormDataWithBebum();
  }

  private close(isEdicao: boolean): void {
    this.closeModalBebum.emit({ cliente: this.cliente, isEdicao });
    this.cleanFormData();
  }

  public cancelar(): void {
    this.cancelarOperacao.emit();
    this.cleanFormData();
  }

  getModalTitle(): string {
    if (this.operacaoDesejada !== OperacoesBebum.Pendura) {
      return this.cliente && this.cliente.apelido ? 'Editar Cliente - ' + this.cliente.apelido : 'Cadastrar cliente';
    } else {
      return 'Pendurar Conta';
    }
  }

}
