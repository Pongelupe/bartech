import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../../core/model/cliente';
import { ClienteService } from '../../service/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';

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

  cadastrarCliente(cliente: Cliente) {
    this.clientes = [...this.clientes, cliente];
    this.fecharModal();
  }

  openModalCliente(): void {
    this.cliente = new Cliente();
    this.ngxSmartModalService.getModal('clienteModal').open();
  }

  fecharModal(): void {
    this.ngxSmartModalService.getModal('clienteModal').close();
  }

}
