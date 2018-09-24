import gql from 'graphql-tag';
import { Produto } from '../../core/model/produto';
import { ItemVenda } from '../../core/model/itemVenda';

export interface AllProdutosQuery {
  allProdutoes: Produto[];
}

export interface CreateItemVendaMutation {
  createItemVenda: ItemVenda;
}

export const ALL_PRODUTOS_QUERY = gql`
  query AllProdutosQuery {
    allProdutoes {
      id
      nome
      preco
      quantidadeEstoque
      codigoDeBarras
    }
  }
`;

export const CREATE_ITEM_VENDA_MUTATION = gql`
  mutation CreateItemVenda($vendaId: ID!, $produtoId: ID!, $quantidade: Int!) {
    createItemVenda(
      vendaId: $vendaId
      quantidade: $quantidade
      produtoId: $produtoId
    ) {
      id
    }
  }
`;
