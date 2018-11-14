import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../../../../core/model/cliente';
import { PagamentoService } from '../../../service/pagamento.service';

@Component({
  selector: 'app-penduras-bebum',
  templateUrl: './penduras-bebum.component.html',
  styleUrls: ['./penduras-bebum.component.scss']
})
export class PendurasBebumComponent implements OnInit {

  pendurados$: Observable<Cliente[]>;
  termoPesquisaPendurado: string;

  constructor(private pagamentoService: PagamentoService,
    private router: Router) { }

  ngOnInit() {
    this.pendurados$ = this.pagamentoService.getClientesPendurados();
  }

  showPenduraDetails(cliente: Cliente): void {
    this.router.navigate(['pagamento/pendurados/details', cliente.id]);
  }

}
