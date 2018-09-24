import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Produto } from '../../core/model/produto';
import { AllProdutosQuery, ALL_PRODUTOS_QUERY } from './venda.graphql';
import { map } from 'rxjs/operators';

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

}
