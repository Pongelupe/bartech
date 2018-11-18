import gql from 'graphql-tag';
import { Cliente } from '../../core/model/cliente';


export interface AllClientesQuery {
  allClientes: Cliente[];
}

export const CREATE_CLIENTE_MUTATION = gql`
  mutation createCliente($nome: String!, $apelido: String!, $cpf: String!, $telefone: String! ) {
    createCliente(
      nome: $nome
      apelido: $apelido
      cpf: $cpf
      telefone: $telefone
    ){
      id
    }
  }
`;

export const ALL_CLIENTES_QUERY = gql`
  query AllClientesQuery {
      allClientes {
        id,
        nome,
        apelido,
        telefone,
        cpf
    }
  }
`;

export const CLIENTE_BY_CPF_QUERY = gql`
  query ClienteByCpfQuery($cpf: String!) {
    Cliente(cpf: $cpf) {
      id
      nome
      apelido
      cpf
      telefone
    }
  }
`;

export const CLIENTE_PENDURAS_BY_ID_QUERY = gql`
  query ClientePendurasByIdQuery($idCliente: ID!) {
  Cliente(
    id: $idCliente
  ) {
    nome
    apelido
    cpf
    penduras {
      id
      valor
      valorPagto
      data
      venda {
        data
        itensVenda {
          produto {
            nome
          }
        }
      }
    }
  }
}
`;

export const UPDATE_OR_CREATE_CLIENTE_MUTATION = gql`
mutation CreateOrUpdateClienteMutation($id: ID!, $nome: String!, $apelido: String!, $cpf: String!, $telefone: String!) {
    updateOrCreateCliente (
      update: {
          id: $id
          nome: $nome
          apelido: $apelido
          cpf: $cpf
          telefone: $telefone
        }
        create: {
          nome: $nome
          apelido: $apelido
          cpf: $cpf
          telefone: $telefone
        }
    ) {
      id
    }
  }
`;

export const DELETE_CLIENTE_MUTATION = gql`
  mutation DeleteClienteMutation($id: ID!) {
    deleteCliente(
      id: $id
    ) {
      id
    }
  }
`;
