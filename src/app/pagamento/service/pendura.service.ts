import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pendura } from '../../core/model/pendura';
import { Apollo } from 'apollo-angular';
import { UPDATE_PENDURAS_MUTATION } from './pendura.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PenduraService {

  constructor(private apollo: Apollo) { }

  pagarPendura(penduras: Pendura[], valor: number): Observable<Pendura[]> {
    const pendurastoBePaid = this.preparePendurasToBePaid(penduras, valor);
    return this.apollo.mutate({
      mutation: UPDATE_PENDURAS_MUTATION(pendurastoBePaid)
    }).pipe(
      map(res => pendurastoBePaid)
    );
  }


  private preparePendurasToBePaid(penduras: Pendura[], valor: number): Pendura[] {
    let parcialValue = valor;
    const pendurastoBePaid: Pendura[] = [];
    penduras.forEach(pendura => {
      const dividaPendura = pendura.valor - pendura.valorPagto;
      if (dividaPendura > 0 && parcialValue > 0) {
        const penduraPaga = Object.assign({}, pendura);

        if (dividaPendura < parcialValue) {
          penduraPaga.valorPagto = pendura.valor;
          parcialValue -= dividaPendura;
        } else {
          penduraPaga.valorPagto = pendura.valorPagto + parcialValue;
          parcialValue = 0;
        }
        pendurastoBePaid.push(penduraPaga);
      }
    });

    return pendurastoBePaid;
  }
}
