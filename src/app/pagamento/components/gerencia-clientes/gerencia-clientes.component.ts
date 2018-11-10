import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../../core/model/cliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-gerencia-clientes',
  templateUrl: './gerencia-clientes.component.html',
  styleUrls: ['./gerencia-clientes.component.scss']
})
export class GerenciaClientesComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  termoPesquisaCliente: string;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clientes$ = this.clienteService.getAllClientes();
  }

}
