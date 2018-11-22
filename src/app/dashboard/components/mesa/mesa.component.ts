import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/core/model/mesa';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { ItemVenda } from 'src/app/core/model/itemVenda';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {

  @Input() mesa: Mesa;
  @Input() numMesa: number;
  timeWithoutAttendance = 0;
  interval: any;
  private lastItemSold: number;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private mesaService: MesaService) { }

  ngOnInit() {
    if (this.mesa.venda && this.mesa.venda.itensVenda) {
      this.startTimer(this.mesa.venda.itensVenda[0]);
    }
    this.mesaService.subscribeToItensVenda(this.mesa.id)
      .subscribe(itemVenda => {
        this.toastrService.info(`${itemVenda.produto.nome} na mesa ${this.numMesa + 1}`);
        this.timeWithoutAttendance = 0;
      });
  }

  private startTimer(itemVenda: ItemVenda) {
    if (itemVenda) {
      this.lastItemSold = new Date(itemVenda.data).getTime();
      this.timeWithoutAttendance = Math.round((new Date().getTime() - this.lastItemSold) / 1000);
    } else {
      this.timeWithoutAttendance = 0;
    }
    this.interval = setInterval(() => {
      this.timeWithoutAttendance++;
    }, 1000);
  }

  createVenda(): void {
    this.router.navigate(this.mesa.venda ? ['venda', this.mesa.venda.id] : ['venda/mesa', this.mesa.id]);
    this.startTimer(null);
  }

}
