import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.toastrService.info('Seja bem-vindo!');
  }
}
