import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtCardComponent } from './components/bt-card/bt-card.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BtTabComponent } from './components/bt-tab/bt-tab.component';
import { BtTabsComponent } from './components/bt-tabs/bt-tabs.component';
import { BtHideDirective } from './directive/bt-hide.directive';
import { NgxMaskModule } from 'ngx-mask';
import { VmErrorComponent } from './components/vm-error/vm-error.component';
import { AbsPipe } from './pipes/abs.pipe';


@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BtHideDirective,
    BtCardComponent,
    BtTabComponent,
    BtTabsComponent,
    NgxSmartModalModule,
    NgxBarcodeModule,
    AngularFontAwesomeModule,
    NgxMaskModule,
    VmErrorComponent,
    AbsPipe
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    BtCardComponent,
    BtTabComponent,
    BtTabsComponent,
    BtHideDirective,
    VmErrorComponent,
    AbsPipe]
})
export class SharedModule { }
