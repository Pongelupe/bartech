import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Venda } from '../../../core/model/venda';

@Injectable()
export class VendaPenduraResolver implements Resolve<Venda> {

  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Venda> {
      const vendaId = route.paramMap.get('id');
      return of();
    }

}
