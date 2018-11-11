import gql from 'graphql-tag';
import { Produto } from '../../core/model/produto';

export interface AllProdutosQuery {
    allProdutos: Produto[];
}

export const CREATE_PRODUTO_MUTATION = gql`
  mutation createProduto($nome: String!, $codigo: Int!, $codigoDeBarras: String, $preco: Float!,
  $temControleEstoque: Boolean, $quantidadeEstoque: Int ) {
    createProduto(
      nome: $nome,
      codigo: $codigo,
      codigoDeBarras: $codigoDeBarras,
      preco: $preco,
      quantidadeEstoque: $quantidadeEstoque,
      temControleEstoque: $temControleEstoque
    ){
      id
    }
  }
`;

export const PRODUTO_BY_CODIGO_QUERY = gql`
  query ProdutoByCodigoQuery($codigo: Int!) {
    Produto(codigo: $codigo) {
      id
      nome
      codigo
      codigoDeBarras
      preco
      quantidadeEstoque
      temControleEstoque
    }
  }
`;
