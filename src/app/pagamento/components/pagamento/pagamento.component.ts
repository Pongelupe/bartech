import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FormaDePagamento } from '../../../core/model/formaDePagamento';
import { Pagamento } from '../../../core/model/pagamento';
import { Venda } from '../../../core/model/venda';
import { PagamentoService } from '../../service/pagamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../core/model/cliente';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Pendura } from '../../../core/model/pendura';
import { VendaService } from '../../../venda/service/venda.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  pagamento = new Pagamento();
  formasDePagamentos = FormaDePagamento;
  venda: Venda = new Venda();
  cliente: Cliente;
  pagamentoForm: FormGroup;
  bebumForm: FormGroup;

  constructor(private pagamentoService: PagamentoService,
    private vendaService: VendaService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private ngxSmartModalService: NgxSmartModalService,
    private router: Router) { }

  ngOnInit() {
    const vendaId = this.route.snapshot.data.vendaId ? this.route.snapshot.data.vendaId : this.route.snapshot.params.id;
    this.pagamentoService.getVendaDetailPagaments(vendaId).subscribe(res => {
      this.venda = Object.assign(Venda.prototype, res);
      this.venda.pagamentos = this.venda.pagamentos.concat(...this.venda.penduras.map(pendura => {
        const pagamento = new Pagamento();
        pagamento.cliente = pendura.cliente;
        pagamento.valor = pendura.valor;
        pagamento.venda = pendura.venda;
        pagamento.formaPagamento = FormaDePagamento.PENDURA;

        return pagamento;
      }));
    }, err => this.toastrService.error(err.message, 'Erro'));

    this.pagamentoForm = this.formBuilder.group({
      valor: ['', [Validators.min(0), Validators.required]],
      formaPagamento: ['', [Validators.required]],
    });
  }

  adicionarPagamento(): void {
    this.pagamento.formaPagamento = this.pagamentoForm.value['formaPagamento'];
    this.pagamento.valor = parseFloat(this.pagamentoForm.value['valor'].replace(',', '.'));
    if (this.pagamento.formaPagamento.toString() !== 'PENDURA') {
      this.pagar();
    } else {
      this.ngxSmartModalService.getModal('addClienteModal').open();
    }
  }

  private pagar(): void {
    this.pagamentoService.createPagamento(this.pagamento)
      .pipe(take(1))
      .subscribe(
        pagamento => {
          this.venda.pagamentos = [...this.venda.pagamentos, pagamento];
          this.pagamento = new Pagamento();
          this.toastrService.success('Recebido R$ ' + pagamento.valor);
          this.pagamentoForm.reset();
        },
        err => this.toastrService.error(err.message, 'Erro'));
  }

  pendurar(cliente: Cliente) {
    this.fecharModal();
    this.cliente = cliente;
    this.pagamento.cliente = cliente;
    const pendura = new Pendura();
    pendura.cliente = cliente;
    pendura.valor = this.pagamento.valor;
    pendura.venda = this.venda;
    this.pagamentoService.pendura(pendura)
      .pipe(take(1))
      .subscribe(penduraId => {
        pendura.id = penduraId;
        this.venda.pagamentos = [...this.venda.pagamentos, this.pagamento];
        this.venda.penduras = [...this.venda.penduras, pendura];
        this.toastrService.success('Pendurado R$ ' + this.pagamento.valor);
        this.pagamento = new Pagamento();
      });
  }

  encerrarPagamento(): void {
    if (this.venda.valorRestanteVenda > 0) {
      this.toastrService.error('Falta registrar R$ ' + this.venda.valorRestanteVenda + ' de pagamento.');
      return;
    }
    this.venda.quitada = this.venda.pagamentos.filter(pgto => pgto.formaPagamento === FormaDePagamento.PENDURA).length <= 0;
    this.venda.finalizada = true;

    this.vendaService.encerrarVenda(this.venda.id, this.venda.quitada)
      .subscribe(() => {
        this.toastrService.success('Troco: R$ ' + Math.abs(this.venda.valorRestanteVenda), 'Venda encerrada');
        this.router.navigate(['mesas']);
      }, err => this.toastrService.error(err.message, 'Erro'));
  }

  fecharModal(): void {
    this.ngxSmartModalService.getModal('addClienteModal').close();
  }

}
