import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Produto } from '../../core/model/produto';
import { Observable } from 'rxjs';
import { CREATE_PRODUTO_MUTATION, PRODUTO_BY_CODIGO_QUERY } from './produto.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private apollo: Apollo) { }

  createProduto(produto: Produto): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: CREATE_PRODUTO_MUTATION,
      variables: {
        nome: produto.nome, codigo: produto.codigo, codigoDeBarras: produto.codigoDeBarras,
        preco: produto.preco, quantidadeEstoque: produto.quantidadeEstoque
      }
    })
      .pipe(
        map(res => res.data.createProduto.id)
      );
  }

  getProdutoByCodigo(codigo: number): Observable<Produto> {
    return this.apollo.query<{ Produto: Produto }>({
      query: PRODUTO_BY_CODIGO_QUERY,
      variables: { codigo }
    })
      .pipe(
        map(res => res.data.Produto)
      );
  }
}
