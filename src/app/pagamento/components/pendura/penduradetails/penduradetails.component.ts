import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../core/model/cliente';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../service/cliente.service';
import { take } from 'rxjs/operators';
import { Produto } from '../../../../core/model/produto';
import { Pendura } from '../../../../core/model/pendura';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-penduradetails',
  templateUrl: './penduradetails.component.html',
  styleUrls: ['./penduradetails.component.scss']
})
export class PenduradetailsComponent implements OnInit {

  cliente: Cliente;
  produtosPendurados: Produto[] = [];
  penduras: Pendura[] = [];
  totalPago = 0.0;
  divida = 0.0;

  constructor(private route: ActivatedRoute,
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private ngxSmartModalService: NgxSmartModalService) { }

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
        this.penduras = cliente.penduras;
        this.ngxSmartModalService.setModalData({
          totalPago: this.totalPago,
          divida: this.divida,
          cliente: this.cliente,
          penduras: this.penduras
        }, 'penduraPaymentModal');
      });
  }

  openModalPayment(): void {
    this.ngxSmartModalService.open('penduraPaymentModal');
  }

  getPagamentos(): Pendura[] {
    return this.penduras.filter(p => p.valorPagto > 0);
  }

  onPenduraPaga(penduraVO: { cliente: Cliente, totalPago: number, divida: number, penduras: Pendura[] }): void {
    const valorPago = penduraVO.totalPago - this.totalPago;
    this.totalPago = penduraVO.totalPago;
    this.penduras = [...penduraVO.penduras];
    this.toastrService.success(`Pago R$ ${valorPago} na pendura!`);
  }

}
