import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Mesa } from '../../core/model/mesa';
import { MesaService } from '../../shared/services/mesa.service';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mesas: Mesa[];

  constructor(
    private mesaService: MesaService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.mesaService.getAllMesas()
      .pipe(take(1))
      .subscribe(mesas => this.mesas = mesas);
  }

  createVenda(mesa: Mesa): void {
    this.router.navigate(mesa.venda ? ['venda', mesa.venda.id] : ['venda/mesa', mesa.id]);
  }

  createMesa(): void {
    this.mesaService.createMesa().subscribe(mesa => {
      this.mesas = [...this.mesas, mesa];
      this.toastrService.success('Mesa criada com sucesso!');
    });
  }

}
