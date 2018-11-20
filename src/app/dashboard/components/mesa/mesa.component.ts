import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/core/model/mesa';
import { MesaService } from 'src/app/shared/services/mesa.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {

  @Input() mesa: Mesa;
  @Input() numMesa: number;
  timeWithoutAttendance = 90;
  interval: any;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private mesaService: MesaService) { }

  ngOnInit() {
    if (this.mesa.venda) {
      this.startTimer();
    }
    this.mesaService.subscribeToItensVenda(this.mesa.id)
      .subscribe(itemVenda => {
        this.toastrService.info(`${itemVenda.produto.nome} na mesa ${this.numMesa + 1}`);
        this.timeWithoutAttendance = 90;
      });
  }

  private startTimer() {
    this.interval = setInterval(() => {
      if (this.timeWithoutAttendance > 0) {
        this.timeWithoutAttendance--;
      }
    }, 1000);
  }

  createVenda(): void {
    this.router.navigate(this.mesa.venda ? ['venda', this.mesa.venda.id] : ['venda/mesa', this.mesa.id]);
    this.startTimer();
  }

}
