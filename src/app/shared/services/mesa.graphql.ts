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
