import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mesas',
    pathMatch: 'full'
  },
  {
    path: 'mesas',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'venda',
    loadChildren: './venda/venda.module#VendaModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
