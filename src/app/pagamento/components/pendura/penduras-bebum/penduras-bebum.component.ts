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
  pendurados$: Observable<Cliente[]>;
  termoPesquisaPendurado: string;

  constructor(private pagamentoService: PagamentoService) { }

  ngOnInit() {
    this.pendurados$ = this.pagamentoService.getClientesPendurados();
  }
}
