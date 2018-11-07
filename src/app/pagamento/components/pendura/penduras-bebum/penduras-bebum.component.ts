import { Component, OnInit } from '@angular/core';
import { PagamentoService } from '../../../service/pagamento.service';
import { Cliente } from '../../../../core/model/cliente';

@Component({
  selector: 'app-penduras-bebum',
  templateUrl: './penduras-bebum.component.html',
  styleUrls: ['./penduras-bebum.component.scss']
})
export class PendurasBebumComponent implements OnInit {
  pendurados: Cliente[];

  constructor(private pagamentoService: PagamentoService) { }

  ngOnInit() {
    this.pagamentoService.getClientesPendurados().subscribe(res => {
      this.pendurados = Object.assign(Cliente.prototype, res);
    }, err => {
      console.log('Erro : ' + err);
    });
  }

}
