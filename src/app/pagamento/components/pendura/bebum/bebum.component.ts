import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../../core/model/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bebum',
  templateUrl: './bebum.component.html',
  styleUrls: ['./bebum.component.scss']
})
export class BebumComponent implements OnInit {

  bebumForm: FormGroup;
  @Input() cliente: Cliente;
  @Output() closeModalBebum = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.bebumForm = this.formBuilder.group({
      nome: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
      apelido: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
      cpf: ['', [Validators.minLength(11), Validators.required]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
    });

    if (this.isClienteNotNull()) {
      this.setFormDataWithBebum();
    }
  }

  private isClienteNotNull(): boolean { return this.cliente !== null && this.cliente !== undefined; }

  cadastraCliente(): void {
    if (!this.cliente) {
      this.cliente = this.bebumForm.value;

      this.clienteService.createCliente(this.cliente)
        .pipe(take(1))
        .subscribe(id => {
          this.cliente.id = id;
          this.setFormDataWithBebum();
          this.toastrService.success('Bebum cadastrado!');
        }, err => this.toastrService.error('Atenção', 'CPF já cadastrado!'));
    } else {
      this.close();
    }
  }

  getBebum(cpf: string): void {
    this.clienteService.getClienteByCpf(cpf)
      .pipe(take(1))
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

  close(): void {
    this.closeModalBebum.emit(this.cliente);
  }

}
