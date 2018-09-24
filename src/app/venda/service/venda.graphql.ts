import gql from 'graphql-tag';
import { Produto } from '../../core/model/produto';

export interface AllProdutosQuery {
  allProdutoes: Produto[];
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
