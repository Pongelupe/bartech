import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [],
  declarations: []
})
export class SharedModule { }
