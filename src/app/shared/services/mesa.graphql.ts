import gql from 'graphql-tag';
import { Mesa } from '../../core/model/mesa';

export interface AllMesas {
  allMesas: Mesa[];
}

export const ALL_MESAS_QUERY = gql`
  query AllMesasQuery {
    allMesas {
      id
      venda {
        id
        data
        itensVenda (last: 1) {
          data
        }
      }
    }
  }
`;

export const CREATE_VENDA_BY_MESA_MUTATION = gql`
  mutation CreateVenda($mesaId: ID!, $data: DateTime!) {
    createVenda(
      mesaId: $mesaId
      data: $data
  ){
      id
  }
}
`;

export const CREATE_MESA_MUTATION = gql`
  mutation CreateMesaMutation {
    createMesa {
      id
    }
  }
`;

export const ITEM_VENDA_CREATED_ON_VENDA_SUBSCRIPTION = gql`
subscription ItemVendaCreatedOnVendaSubscription ($mesaId: ID!) {
  ItemVenda (
    filter: {
      mutation_in: [ CREATED ]
      node: {
        venda: {
          mesa: {
            id: $mesaId
          }
        }
      }
    }
  ) {
    node {
      venda {
        mesa {
          id
        }
      }
      produto {
        id
        nome
        preco
        quantidadeEstoque
        codigo
        codigoDeBarras
        temControleEstoque
      }
      id
      quantidade
      desconto
    }
  }
}
`;
