import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtCardComponent } from './components/bt-card/bt-card.component';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BtCardComponent
  ],
  imports: [
    CommonModule
  ],
  declarations: [BtCardComponent]
})
export class SharedModule { }
