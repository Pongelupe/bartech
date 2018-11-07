import gql from 'graphql-tag';
import { Venda } from '../../core/model/venda';

export interface VendaDetailPagamentosQuery {
  Venda: Venda;
}

export const VENDA_DETAIL_PAGAMENTOS_QUERY = gql`
  query VendaDetailPagamentosQuery($vendaId: ID!) {
    Venda(id: $vendaId) {
      id
      pagamentos {
        id
        valor
        formaPagamento
      },
      penduras {
        id
        valor
        cliente {
          nome
          apelido
        }
      },
      mesa {
        id
      },
      itensVenda {
        id
        quantidade
        desconto
        produto {
          preco
        }
      }
    }
  }
`;

export const CREATE_PAGAMENTO_MUTATION = gql`
  mutation createPagamento($data: DateTime!, $vendaId: ID!, $formaPagamento: FormaDePagamento!, $valor: Float! ) {
    createPagamento(
      data: $data,
      vendaId: $vendaId,
      formaPagamento: $formaPagamento,
      valor: $valor
    ){
      id,
      formaPagamento,
      valor
    }
  }
`;

export const CREATE_PENDURA_MUTATION = gql`
  mutation createPendura($data: DateTime!, $vendaId: ID!, $clienteId: ID!, $valor: Float! ) {
    createPendura(
      data: $data,
      vendaId: $vendaId,
      clienteId: $clienteId,
      valor: $valor
    ){
      id
    }
  }
`;
