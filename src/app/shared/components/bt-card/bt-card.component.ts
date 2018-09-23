import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bt-card',
  templateUrl: './bt-card.component.html',
  styleUrls: ['./bt-card.component.scss']
})
export class BtCardComponent implements OnInit {
  @Input() title : string;
  @Input() subtitle : string;
  @Input() text : string;

  constructor() { }

  ngOnInit() {
  }

}
