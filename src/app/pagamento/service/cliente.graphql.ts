import gql from 'graphql-tag';
import { Cliente } from '../../core/model/cliente';


export interface AllClientesQuery {
  allClientes: Cliente[];
}

export const CREATE_CLIENTE_MUTATION = gql`
  mutation createCliente($nome: string, $apelido: string, $cpf: string, $telefone: string ) {
    createCliente(
      nome: $nome,
      apelido: $apelido,
      cpf: $cpf,
      telefone: $telefone
    ){
      id
    }
  }
`;

export const ALL_CLIENTES_QUERY = gql`
  query allClientes {
    id,
    nome,
    apelido,
    telefone,
    cpf
  }
`;
