import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApolloConfigModuleModule } from '../apollo-config-module.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ApolloConfigModuleModule
  ],
  declarations: []
})
export class CoreModule { }
