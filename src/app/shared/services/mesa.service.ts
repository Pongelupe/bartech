import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Mesa } from '../../core/model/mesa';
import { AllMesas, ALL_MESAS_QUERY, CREATE_VENDA_BY_MESA_MUTATION } from './mesa.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private apollo: Apollo) { }

  getAllMesas(): Observable<Mesa[]> {
    return this.apollo.watchQuery<AllMesas>({
      query: ALL_MESAS_QUERY
    }).valueChanges
      .pipe(
        map(res => res.data.allMesas)
      );
  }
  createVendaByMesaId(mesaId: string): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: CREATE_VENDA_BY_MESA_MUTATION,
      variables: { mesaId, data: new Date().toISOString() }
    })
      .pipe(
        map(res => res.data.createVenda)
      );
  }

}
