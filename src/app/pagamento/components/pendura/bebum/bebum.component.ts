import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../../core/model/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bebum',
  templateUrl: './bebum.component.html',
  styleUrls: ['./bebum.component.scss']
})
export class BebumComponent implements OnInit {

  bebumForm: FormGroup;
  @Input() cliente: Cliente;
  @Output() closeModalBebum = new EventEmitter();
  @Output() cancelarOperacao = new EventEmitter();
  @Input() hideButtonSearch: false;
  @Input() operacaoDesejada: OperacoesBebum;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private toastrService: ToastrService) { }

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

  private isClienteNotNull(): boolean { return this.cliente !== null && this.cliente !== undefined; }

  private selecionarCliente(): void {
    this.cliente = this.bebumForm.value;
    this.getBebumByCpf(this.cliente.cpf)
      .subscribe(cliente => {
        if (cliente) {
          if (this.operacaoDesejada !== OperacoesBebum.Criacao) {
            this.cliente = cliente;
            this.close();
          } else {
            this.toastrService.error('O cliente já está cadastrado!');
          }

        } else {
          if (this.operacaoDesejada !== OperacoesBebum.Edicao) {
            this.createCliente();
          } else {
            this.toastrService.error('O cliente não está cadastrado!');
          }
        }
      });
  }

  private createCliente(): void {
    this.clienteService.createCliente(this.cliente)
      .pipe(take(1))
      .subscribe(id => {
        this.cliente.id = id;
        this.setFormDataWithBebum();
        this.toastrService.success('Cliente cadastrado com sucesso.');
        this.close();
      }, err => {
        if (err.graphQLErrors.filter(e => e.code === 3010)) {
          this.toastrService.success('Atenção', 'Bebum selecionado');
          this.close();
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

  private close(): void {
    this.closeModalBebum.emit(this.cliente);
    this.cleanFormData();
  }

  private cancelar(): void {
    this.cancelarOperacao.emit();
    this.cleanFormData();
  }

}

enum OperacoesBebum {
  Criacao = 'Criacao',
  Edicao = 'Edicao',
  Pendura = 'Pendura'
}
