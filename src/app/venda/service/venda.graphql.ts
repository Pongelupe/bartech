import gql from 'graphql-tag';
import { Produto } from '../../core/model/produto';
import { ItemVenda } from '../../core/model/itemVenda';
import { Venda } from '../../core/model/venda';

export interface AllProdutosQuery {
  allProdutoes: Produto[];
}

export interface VendaDetailQuery {
  Venda: Venda;
}

export interface CreateItemVendaMutation {
  createItemVenda: ItemVenda;
}

export const ALL_PRODUTOS_QUERY = gql`
  query AllProdutosQuery {
    allProdutoes (orderBy: codigo_ASC){
      id
      nome
      preco
      temControleEstoque
      quantidadeEstoque
      codigoDeBarras
      codigo
    }
  }
`;

export const VENDA_DETAIL_QUERY = gql`
  query VendaDetailQuery($vendaId: ID!) {
    Venda(id: $vendaId) {
      id
      mesa {
        id
      }
      itensVenda {
        id
        quantidade
        desconto
        produto {
          id
          nome
          preco
        }
      }
    }
  }
`;

export const CREATE_ITEM_VENDA_UPDATE_PRODUTO_MUTATION = gql`
  mutation CreateItemVenda($vendaId: ID!, $produtoId: ID!, $quantidade: Int!, $quantidadeEstoque: Int!, $data: DateTime!) {
    createItemVenda(
      vendaId: $vendaId
      quantidade: $quantidade
      produtoId: $produtoId
      data: $data
    ) {
      id
      quantidade
      produto {
        id
        nome
        preco
        quantidadeEstoque
        codigo
        codigoDeBarras
        temControleEstoque
      }
    }
    updateProduto(
    quantidadeEstoque: $quantidadeEstoque
    id: $produtoId
  ) {
    id,
    quantidadeEstoque
  }
  }
`;

export const CREATE_ITEM_VENDA_MUTATION = gql`
  mutation CreateItemVenda($vendaId: ID!, $produtoId: ID!, $quantidade: Int!, $data: DateTime!) {
    createItemVenda(
      vendaId: $vendaId
      quantidade: $quantidade
      produtoId: $produtoId
      data: $data
    ) {
      id
      quantidade
      produto {
        id
        nome
        preco
        quantidadeEstoque
        codigo
        codigoDeBarras
        temControleEstoque
      }
    }
  }
`;


export const CREATE_VENDA_AVULSA_MUTATION = gql`
  mutation CreateVenda($data: DateTime!) {
    createVenda(
      data: $data
  ){
      id
  }
}
`;

export const DELETE_ITEM_VENDA_MUTATION = gql`
  mutation DeleteItemVenda($idItemVenda: ID!) {
    deleteItemVenda(
      id: $idItemVenda
  ){
      id
  }
}
`;

export const DELETE_VENDA_MUTATION = gql`
  mutation DeleteVenda($idVenda: ID!) {
    deleteVenda(
      id: $idVenda
    ){
      id
    }
  }
`;

export const ENCERRAR_VENDA_MUTATION = gql`
  mutation EncerrarVenda($idVenda: ID!,$quitada: Boolean! ) {
    updateVenda(
      id: $idVenda
      quitada: $quitada
      finalizada: true
      mesaId: null
  ){
    id
  }
}
`;
