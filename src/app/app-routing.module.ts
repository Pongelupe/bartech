import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendaComponent } from './venda/venda/venda.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'venda', component: VendaComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
