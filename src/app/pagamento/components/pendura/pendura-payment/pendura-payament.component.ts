import { AfterViewInit, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { Cliente } from '../../../../core/model/cliente';
import { Pendura } from '../../../../core/model/pendura';
import { PenduraService } from '../../../service/pendura.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pendura-payment',
  templateUrl: './pendura-payment.component.html',
  styleUrls: ['./pendura-payment.component.scss']
})
export class PenduraPaymentComponent implements OnInit, AfterViewInit {

  @Output() penduraPagaEvent = new EventEmitter<{ cliente: Cliente, totalPago: Number, divida: Number, penduras: Pendura[] }>();
  penduraPaymentForm: FormGroup;
  cliente: Cliente;
  penduras: Pendura[];
  totalPago = 0.0;
  divida = 0.0;

  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private penduraService: PenduraService
  ) { }

  ngOnInit() {
    this.penduraPaymentForm = this.formBuilder.group({
      valor: ['', [Validators.min(0), Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.ngxSmartModalService.getModal('penduraPaymentModal')
      .onOpen.subscribe((modal: NgxSmartModalComponent) => {
        const data = modal.getData();
        this.cliente = data['cliente'];
        this.totalPago = data['totalPago'];
        this.divida = data['divida'];
        this.penduras = data['penduras'];
        this.penduraPaymentForm.controls['valor']
          .setValidators([Validators.min(0), Validators.required, Validators.max(this.divida - this.totalPago)]);
      });
  }

  pagarPenduras(): void {
    const valorForm = parseFloat(this.penduraPaymentForm.value['valor'].replace(',', '.'));
    this.penduraService.pagarPendura(this.penduras, valorForm)
      .pipe(take(1))
      .subscribe(penduras => {
        this.penduras = penduras;
        this.ngxSmartModalService.getModal('penduraPaymentModal').close();
        this.penduraPaymentForm.reset();
        this.penduraPagaEvent.emit({
          cliente: this.cliente,
          penduras: this.penduras,
          divida: this.divida,
          totalPago: this.totalPago + valorForm
        });
      });
  }

}
