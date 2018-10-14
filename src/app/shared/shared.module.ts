import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtCardComponent } from './components/bt-card/bt-card.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BtTabComponent } from './components/bt-tab/bt-tab.component';
import { BtTabsComponent } from './components/bt-tabs/bt-tabs.component';
import { BtHideDirective } from './directive/bt-hide.directive';


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
    AngularFontAwesomeModule
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
  ],
  declarations: [
    BtCardComponent,
    BtTabComponent,
    BtTabsComponent,
    BtHideDirective]
})
export class SharedModule { }
