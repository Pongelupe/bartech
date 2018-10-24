import { Component, OnInit } from '@angular/core';
import { Pagamento } from '../../../core/model/pagamento';
import { FormaDePagamento } from '../../../core/model/formaDePagaMento';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Venda } from '../../../core/model/venda';
import { Observable } from 'rxjs';
import { PagamentoService } from '../../service/pagamento.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  pagamento = new Pagamento();
  formasDePagamentos = FormaDePagamento;
  venda: Venda = new Venda();
  constructor(private svcPagamento: PagamentoService, private toastrService: ToastrService, private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    const vendaId = this.route.snapshot.data.vendaId ? this.route.snapshot.data.vendaId : this.route.snapshot.params.id;
    this.svcPagamento.getVendaDetailPagaments(vendaId).subscribe(res => {
      this.venda = Object.assign(Venda.prototype, res);
    }, err => this.toastrService.error(err.message, 'Erro'));
  }

  adicionarPagamento(): void {
    this.svcPagamento.createPagamento(this.pagamento)
      .pipe(take(1))
      .subscribe(
        pagamento => {
          this.venda.pagamentos = [...this.venda.pagamentos, pagamento];
          this.pagamento = new Pagamento();
          this.toastrService.success('Recebido R$ ' + pagamento.valor);

        },
        err => this.toastrService.error(err.message, 'Erro'));
  }



}
