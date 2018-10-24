import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PagamentoService } from '../../service/pagamento.service';

@Injectable()
export class PagamentoResolver implements Resolve<string> {

    constructor(private pagamentoService: PagamentoService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): string {
        const vendaId = route.paramMap.get('id');
        return vendaId;
    }

}
