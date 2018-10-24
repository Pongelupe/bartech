import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_PAGAMENTO_MUTATION, VendaDetailPagamentosQuery, VENDA_DETAIL_PAGAMENTOS_QUERY, CREATE_PENDURA_MUTATION, CREATE_CLIENTE_MUTATION, ClienteQuery, AllClientesQuery, ALL_CLIENTES_QUERY } from './pagamento.graphql';
import { Venda } from '../../core/model/venda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagamento } from '../../core/model/pagamento';
import { FormaDePagamento } from '../../core/model/formaDePagaMento';
import { Pendura } from '../../core/model/pendura';
import { Cliente } from '../../core/model/cliente';

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

  createPagamento(pagamento: Pagamento): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: CREATE_PAGAMENTO_MUTATION,
      // tslint:disable-next-line:max-line-length
      variables: { data: new Date().toISOString(), vendaId: pagamento.venda.id, formaPagamento: pagamento.formaPagamento, valor: pagamento.valor }
    })
      .pipe(
        map(res => res.data.createPagamento.id)
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

  createCliente(cliente: Cliente): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: CREATE_CLIENTE_MUTATION,
      variables: { nome: cliente.nome, apelido: cliente.apelido, cpf: cliente.cpf, telefone: cliente.telefone }
    })
      .pipe(
        map(res => res.data.createCliente.id)
      );
  }

  getAllClientes(): Observable<Cliente[]> {
    return this.apollo.query<AllClientesQuery>({
      query: ALL_CLIENTES_QUERY
    })
      .pipe(
        map(res => res.data.allClientes)
      );
  }
}
