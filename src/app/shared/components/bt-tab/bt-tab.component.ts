import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BtTabsComponent } from '../bt-tabs/bt-tabs.component';

@Component({
  selector: 'app-bt-tab',
  templateUrl: './bt-tab.component.html',
  styleUrls: ['./bt-tab.component.scss']
})
export class BtTabComponent implements OnInit {

  @Input() isSelected: boolean;
  @Output() isSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() change: EventEmitter<void> = new EventEmitter<void>();

  @Input() titulo: string;

  constructor(private tabs: BtTabsComponent) {}

  ngOnInit() {}

  selecionar() {
    this.isSelected = true;
    this.isSelectedChange.emit(true);
    this.change.emit();
  }

}
