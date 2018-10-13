import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Mesa } from '../../core/model/mesa';
import { MesaService } from '../../shared/services/mesa.service';
import { VendaService } from '../../venda/service/venda.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mesas$: Observable<Mesa[]>;

  constructor(
    private mesaService: MesaService,
    private router: Router,
    private vendaService: VendaService) { }

  ngOnInit() {
    this.mesas$ = this.mesaService.getAllMesas();
  }

  createVenda(mesa: Mesa): void {
    this.router.navigate(mesa.venda ? ['venda', mesa.venda.id] : ['venda/mesa', mesa.id]);
  }

  createVendaAvulsa(): void {
    this.vendaService.createVenda()
      .subscribe(idVenda => this.router.navigate(['venda', idVenda]));
  }

}
