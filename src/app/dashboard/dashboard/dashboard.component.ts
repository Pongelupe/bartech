import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from '../../core/model/mesa';
import { MesaService } from '../../shared/services/mesa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mesas: Mesa[];

  constructor(
    private mesaService: MesaService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.mesaService.getAllMesas()
      .subscribe(mesas => this.mesas = mesas);
  }

  createMesa(): void {
    this.mesaService.createMesa().subscribe(mesa => {
      this.mesas = [...this.mesas, mesa];
      this.toastrService.success('Mesa criada com sucesso!');
    });
  }

}
