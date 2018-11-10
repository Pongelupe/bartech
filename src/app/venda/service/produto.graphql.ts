import gql from 'graphql-tag';
import { Produto } from '../../core/model/produto';

export interface AllProdutosQuery {
    allProdutos: Produto[];
}

export const CREATE_PRODUTO_MUTATION = gql`
  mutation createProduto($nome: String!, $codigo: String!, $codigoDeBarras: String, $preco: Float!, $quantidadeEstoque: Int! ) {
    createProduto(
      nome: $nome,
      codigo: $codigo,
      codigoDeBarras: $codigoDeBarras,
      preco: $preco,
      quantidadeEstoque: $quantidadeEstoque
    ){
      id
    }
  }
`;

export const PRODUTO_BY_CODIGO_QUERY = gql`
  query ProdutoByCodigoQuery($codigo: String!) {
    Produto(codigo: $cpf) {
      id
      nome
      codigo
      codigoDeBarras
      preco,
      quantidadeEstoque
    }
  }
`;
