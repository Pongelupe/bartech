import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Cliente } from '../../core/model/cliente';
import { map } from 'rxjs/operators';
import {
  CREATE_CLIENTE_MUTATION,
  ALL_CLIENTES_QUERY, AllClientesQuery,
  CLIENTE_BY_CPF_QUERY,
  CLIENTE_PENDURAS_BY_ID_QUERY,
  UPDATE_OR_CREATE_CLIENTE_MUTATION,
  DELETE_CLIENTE_MUTATION
} from './cliente.graphql';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private apollo: Apollo) { }

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

  getClienteByCpf(cpf: string): Observable<Cliente> {
    return this.apollo.query<{ Cliente: Cliente }>({
      query: CLIENTE_BY_CPF_QUERY,
      variables: { cpf }
    })
      .pipe(
        map(res => res.data.Cliente)
      );
  }

  getPendurasById(idCliente: string): Observable<Cliente> {
    return this.apollo.query<{ Cliente: Cliente }>({
      query: CLIENTE_PENDURAS_BY_ID_QUERY,
      variables: { idCliente }
    })
      .pipe(
        map(res => res.data.Cliente)
      );
  }

  updateOrCreateCliente(cliente: Cliente): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: UPDATE_OR_CREATE_CLIENTE_MUTATION,
      variables: { ...cliente }
    })
      .pipe(
        map(res => res.data.updateOrCreateCliente.id)
      );
  }

  deleteCliente(id: string): Observable<string> {
    return this.apollo.mutate<string>({
      mutation: DELETE_CLIENTE_MUTATION,
      variables: { id }
    })
      .pipe(
        map(res => res.data.deleteCliente.id)
      );
  }
}
