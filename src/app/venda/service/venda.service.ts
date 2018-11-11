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
  CREATE_VENDA_AVULSA_MUTATION,
  DELETE_VENDA_MUTATION,
  CREATE_ITEM_VENDA_UPDATE_PRODUTO_MUTATION
} from './venda.graphql';
import { map } from 'rxjs/operators';
import { Venda } from '../../core/model/venda';
import { ItemVenda } from '../../core/model/itemVenda';
import { DataProxy } from 'apollo-cache';
import { AllMesas, ALL_MESAS_QUERY } from '../../shared/services/mesa.graphql';

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

  private adicionarItemVendaEAtualizarEstoque(quantidade: number, produtoId: string, vendaId: string, quantidadeEstoque: number)
    : Observable<ItemVenda> {
    return this.apollo.mutate({
      mutation: CREATE_ITEM_VENDA_UPDATE_PRODUTO_MUTATION,
      variables: {
        produtoId,
        vendaId,
        quantidade,
        quantidadeEstoque: quantidadeEstoque - quantidade
      }
    })
      .pipe(
        map(res => res.data.createItemVenda)
      );
  }

  adicionarItemVenda(quantidade: number, produtoId: string, vendaId: string, quantidadeEstoque: number, temControleEstoque: boolean)
    : Observable<ItemVenda> {
    if (temControleEstoque) {
      return this.adicionarItemVendaEAtualizarEstoque(quantidade, produtoId, vendaId, quantidadeEstoque);
    } else {
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

  cancelVenda(venda: Venda): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: DELETE_VENDA_MUTATION,
      variables: { idVenda: venda.id },
      update: (store: DataProxy, id) => {
        const idVenda = id.data.deleteVenda.id;
        const data = store.readQuery<AllMesas>({
          query: ALL_MESAS_QUERY
        });
        const mesa = data.allMesas.filter(m => m.venda && m.venda.id === idVenda)[0];
        mesa.venda = null;
        const mesas = [].concat(data.allMesas.filter(m => m.id !== mesa.id));
        mesas.push(mesa);
        data.allMesas = mesas;
        store.writeQuery({
          query: ALL_MESAS_QUERY,
          data
        });
      }
    })
      .pipe(
        map(res => res.data.deleteVenda.id)
      );
  }
}
