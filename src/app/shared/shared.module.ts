import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtCardComponent } from './components/bt-card/bt-card.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BtCardComponent,
    NgxSmartModalModule,
    SweetAlert2Module
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  declarations: [BtCardComponent]
})
export class SharedModule { }
