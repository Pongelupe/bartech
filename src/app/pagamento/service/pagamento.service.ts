import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Venda } from '../../core/model/venda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagamento } from '../../core/model/pagamento';
import { Pendura } from '../../core/model/pendura';
import {
  VendaDetailPagamentosQuery,
  VENDA_DETAIL_PAGAMENTOS_QUERY,
  CREATE_PAGAMENTO_MUTATION,
  CREATE_PENDURA_MUTATION,
} from './pagamento.graphql';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private apollo: Apollo) { }

  getVendaDetailPagaments(vendaId: string): Observable<Venda> {
    return this.apollo.query<VendaDetailPagamentosQuery>({
      query: VENDA_DETAIL_PAGAMENTOS_QUERY,
      variables: {
        vendaId
      }
    })
      .pipe(
        map(res => res.data.Venda)
      );
  }

  createPagamento(pagamento: Pagamento): Observable<Pagamento> {
    return this.apollo.mutate<string>({
      mutation: CREATE_PAGAMENTO_MUTATION,
      variables: {
        data: new Date().toISOString(),
        vendaId: pagamento.venda.id,
        formaPagamento: pagamento.formaPagamento,
        valor: parseFloat(pagamento.valor.toString())
      }
    })
      .pipe(
        map(res => res.data.createPagamento)
      );
  }

  createPendura(pendura: Pendura): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: CREATE_PENDURA_MUTATION,
      variables: { data: new Date().toISOString(), vendaId: pendura.venda.id, clienteId: pendura.cliente.id, valor: pendura.valor }
    })
      .pipe(
        map(res => res.data.createPendura.id)
      );
  }
}
