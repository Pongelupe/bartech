import { Venda } from '../../core/model/venda';
import gql from 'graphql-tag';

export interface VendaDetailPagamentsQuery {
  Venda: Venda;
}

export const VENDA_DETAIL_PAGAMENTS_QUERY = gql`
  query VendaDetailPagamentsQuery($vendaId: ID!) {
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
  mutation createPagamento($data: Date, $vendaId: string, $formaPagamento: string, $valor: number ) {
    createPagamento(
      data: $data,
      vendaId: $vendaId,
      formaPagamento: $formaPagamento,
      valor: $valor
    ){
      id
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
