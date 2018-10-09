import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MesaService } from '../../../shared/services/mesa.service';

@Injectable()
export class VendaResolver implements Resolve<string> {

  constructor(private mesaService: MesaService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<string> {
    const mesaId = route.paramMap.get('id');
    return this.mesaService.createVendaByMesaId(mesaId);
  }

}
