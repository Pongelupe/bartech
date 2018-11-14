import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../core/model/cliente';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../service/cliente.service';
import { take } from 'rxjs/operators';
import { Produto } from '../../../../core/model/produto';
import { Pendura } from '../../../../core/model/pendura';

@Component({
  selector: 'app-penduradetails',
  templateUrl: './penduradetails.component.html',
  styleUrls: ['./penduradetails.component.scss']
})
export class PenduradetailsComponent implements OnInit {

  cliente: Cliente;
  produtosPendurados: Produto[] = [];
  totalPago = 0.0;
  divida = 0.0;

  constructor(private route: ActivatedRoute,
    private clienteService: ClienteService) { }

  ngOnInit() {
    const idCliente = this.route.snapshot.paramMap.get('idCliente');
    this.clienteService.getPendurasById(idCliente)
      .pipe(take(1))
      .subscribe(cliente => {
        this.cliente = cliente;
        cliente.penduras.map(pen => pen.venda.itensVenda)
          .forEach(itens => itens.map(itemVenda => itemVenda.produto)
            .forEach(produto => this.produtosPendurados.push(produto)));
        this.totalPago = cliente.penduras.reduce((acc, ele) => acc + ele.valorPagto, 0.0);
        this.divida = cliente.penduras.reduce((acc, ele) => acc + ele.valor, 0.0);
      });
  }

  getPagamentos(): Pendura[] {
    return this.cliente.penduras.filter(p => p.valorPagto > 0);
  }

}
