import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Venda } from '../../../core/model/venda';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pendura',
  templateUrl: './pendura.component.html',
  styleUrls: ['./pendura.component.scss']
})
export class PenduraComponent implements OnInit {

  venda: Venda;

  constructor(private route: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        map(routeData => this.venda = routeData.venda)
      )
      .subscribe(err => this.toastrService.error(err.message, "Erro"));
  }

}
