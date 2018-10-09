import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Produto } from '../../core/model/produto';
import {
  AllProdutosQuery,
  ALL_PRODUTOS_QUERY,
  CREATE_ITEM_VENDA_MUTATION,
  VendaDetailQuery,
  VENDA_DETAIL_QUERY,
  DELETE_ITEM_VENDA_MUTATION,
  CREATE_VENDA_AVULSA_MUTATION
} from './venda.graphql';
import { map } from 'rxjs/operators';
import { Venda } from '../../core/model/venda';
import { ItemVenda } from '../../core/model/itemVenda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(
    private apollo: Apollo
  ) { }


  getAllProdutos(): Observable<Produto[]> {
    return this.apollo.query<AllProdutosQuery>({
      query: ALL_PRODUTOS_QUERY
    })
      .pipe(
        map(res => res.data.allProdutoes)
      );
  }

  getVendaDetail(vendaId: string): Observable<Venda> {
    return this.apollo.query<VendaDetailQuery>({
      query: VENDA_DETAIL_QUERY,
      variables: {
        vendaId
      }
    })
      .pipe(
        map(res => res.data.Venda)
      );
  }

  adicionarItemVenda(quantidade: number, produtoId: string, vendaId: string): Observable<ItemVenda> {
    return this.apollo.mutate({
      mutation: CREATE_ITEM_VENDA_MUTATION,
      variables: {
        produtoId,
        vendaId,
        quantidade
      }
    })
      .pipe(
        map(res => res.data.createItemVenda)
      );
  }

  createVenda(): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: CREATE_VENDA_AVULSA_MUTATION,
      variables: { data: new Date().toISOString() }
    })
      .pipe(
        map(res => res.data.createVenda.id)
      );
  }

  removeItem(item: ItemVenda): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: DELETE_ITEM_VENDA_MUTATION,
      variables: { idItemVenda: item.id }
    })
      .pipe(
        map(res => res.data.deleteItemVenda.id)
      );
  }

}
