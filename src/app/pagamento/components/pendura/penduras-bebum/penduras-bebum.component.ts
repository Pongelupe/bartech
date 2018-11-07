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
    const auxPendurados = new Array<Cliente>();
    for (let i = 0; i < this.pendurados.length; i++) {
      auxPendurados.push(new Cliente(this.pendurados[i].nome, this.pendurados[i].cpf, this.pendurados[i].apelido, this.pendurados[i].telefone, this.pendurados[i].penduras, this.pendurados[i].pagamentos));
    }
    this.pendurados = auxPendurados;
  }
}
