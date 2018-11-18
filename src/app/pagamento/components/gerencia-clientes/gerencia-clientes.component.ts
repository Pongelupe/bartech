import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Cliente } from '../../../core/model/cliente';
import { ClienteService } from '../../service/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerencia-clientes',
  templateUrl: './gerencia-clientes.component.html',
  styleUrls: ['./gerencia-clientes.component.scss']
})
export class GerenciaClientesComponent implements OnInit {
  clientes: Cliente[];
  termoPesquisaCliente: string;
  cliente: Cliente;

  constructor(
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.clienteService.getAllClientes().subscribe(res => {
      this.clientes = res;
    });
  }

  onClienteEvent(clienteVO: { cliente: Cliente, isEdicao: boolean }) {
    if (!clienteVO.isEdicao) {
      this.clientes = [...this.clientes, clienteVO.cliente];
    } else {
      this.clientes = this.clientes.filter(c => c.id !== clienteVO.cliente.id);
      this.clientes = [...this.clientes, clienteVO.cliente];
    }
    this.fecharModal();
  }

  openModalCliente(): void {
    this.cliente = new Cliente();
    this.ngxSmartModalService.getModal('clienteModal').open();
  }

  fecharModal(): void {
    this.cliente = null;
    this.ngxSmartModalService.getModal('clienteModal').close();
  }

  editarCliente(cliente: Cliente): void {
    this.cliente = cliente;
    this.ngxSmartModalService.getModal('clienteModal').open();
  }

  deleteCliente(cliente: Cliente): void {
    this.clienteService.deleteCliente(cliente.id)
      .subscribe(id => {
        this.clientes = this.clientes.filter(c => c.id !== id);
        this.toastrService.success(`Cliente ${cliente.nome} foi removido com sucesso!`);
      },
        err => this.toastrService.error(`Cliente ${cliente.nome} não pode ser removido!`));
  }

}
