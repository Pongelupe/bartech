import gql from 'graphql-tag';
import { Pendura } from '../../core/model/pendura';


export const UPDATE_PENDURAS_MUTATION = (penduras: Pendura[]) => {
  const baseMutation = (pendura: Pendura, i) => `
    pendura${i}: updatePendura(
      id: "${pendura.id}"
      valorPagto: ${pendura.valorPagto}
    ) {
      id
      valor
      cliente {
        nome
        apelido
      }
    }
  `;
  let index = 0;
  const pendurasMutations = penduras.reduce((acc, element) => acc.concat(baseMutation(element, index++)) , '');
  return gql `
    mutation updatePenduras {
      ${pendurasMutations}
    }
  `;
};
