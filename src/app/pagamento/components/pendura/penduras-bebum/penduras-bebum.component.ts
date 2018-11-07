import { Component, OnInit } from '@angular/core';
import { PagamentoService } from '../../../service/pagamento.service';
import { Cliente } from '../../../../core/model/cliente';
import { Observable } from 'rxjs';
import { debug } from 'util';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-penduras-bebum',
  templateUrl: './penduras-bebum.component.html',
  styleUrls: ['./penduras-bebum.component.scss']
})
export class PendurasBebumComponent implements OnInit {
  pendurados: Cliente[];
  totalPenduras: number;
  totalPagamentosEmPenduras: number;
  saldoPendura: number;

  constructor(private pagamentoService: PagamentoService) { }

  ngOnInit() {
    this.pagamentoService.getClientesPendurados().subscribe(res => {
      this.pendurados = res;
      this.updateTotais();
    }, err => {
      console.log('Erro : ' + err);
    });
  }

  updateTotais() {
    this.totalPenduras = 0;
    this.totalPagamentosEmPenduras = 0;

    this.pendurados.forEach(cliente => {
      cliente = Object.assign(Cliente.prototype, cliente);
      if (cliente.penduras !== undefined && cliente.penduras.length > 0) {
        cliente.penduras.forEach(item => {
          this.totalPenduras += item.valor;
          this.totalPagamentosEmPenduras += item.valorPagto;
        });
      }
      this.saldoPendura = this.totalPenduras - this.totalPagamentosEmPenduras;
    });
  }
}
