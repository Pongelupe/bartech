import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtCardComponent } from './components/bt-card/bt-card.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BtCardComponent,
    NgxSmartModalModule,
    AngularFontAwesomeModule
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
  ],
  declarations: [BtCardComponent]
})
export class SharedModule { }
