import gql from 'graphql-tag';
import { Venda } from '../../core/model/venda';

export interface VendaDetailPagamentosQuery {
  Venda: Venda;
}

export const VENDA_DETAIL_PAGAMENTOS_QUERY = gql`
  query VendaDetailPagamentosQuery($vendaId: ID!) {
    Venda(id: $vendaId) {
      id,
      pagamentos {
        valor,
        formaPagamento
      },
      penduras {
        valor,
        cliente {
          nome,
          apelido
        }
      }
      itensVenda {
        quantidade,
        desconto,
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
  mutation createPendura($data: Date, $vendaId: string, $clienteId: string, $valor: number ) {
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
