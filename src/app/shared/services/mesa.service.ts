import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Mesa } from '../../core/model/mesa';
import {
  AllMesas,
  ALL_MESAS_QUERY,
  CREATE_VENDA_BY_MESA_MUTATION,
  CREATE_MESA_MUTATION,
  ITEM_VENDA_CREATED_ON_VENDA_SUBSCRIPTION
} from './mesa.graphql';
import { map } from 'rxjs/operators';
import { ItemVenda } from 'src/app/core/model/itemVenda';

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

  createMesa(): Observable<Mesa> {
    return this.apollo.mutate<Mesa>({
      mutation: CREATE_MESA_MUTATION
    })
      .pipe(
        map(res => res.data.createMesa)
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

  subscribeToItensVenda(mesaId: string): Observable<ItemVenda> {
    return this.apollo.subscribe({
      query: ITEM_VENDA_CREATED_ON_VENDA_SUBSCRIPTION,
      variables: { mesaId }
    }).pipe(
      map(res => res.data.ItemVenda.node)
    );
  }

}
