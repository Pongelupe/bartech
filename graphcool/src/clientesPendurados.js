/**
 * Function para retornar todos os clientes que estão pendurados com os seus respectivos valores.
 * Clientes pendurados são aquelas que possuem alguma pendura no qual o valor do pagamento dela é menor
 * que o valor que ficou de fiado, resumindo é aquele que possui pendura que não foi totalmente quitada.
 * @return [clientesPendurados] lista com clientes pendurados
 */
require('isomorphic-fetch');

export default async event => {
    /**
     * Definição das variáveis que serão utilizadas.
     */
    const clientesPendurados = [];
    const endpoint = 'https://api.graph.cool/simple/v1/cjlzqfhlg1f1v01420mlus4ma';
    const queryAllClientes =
        `query {  
        allClientes {
            id,
            nome,
            apelido,
            cpf,
            telefone,
            penduras {
                data,
                valor,
                valorPagto
            }
        }
    }`
    /**
     * Requisitando ao endpoint todos os clientes cadastrados.
     */
    const response = await fetch(endpoint, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: queryAllClientes
        })
    })

    response = await response.json();
    /**
     * Selecionando apenas os clientes pendurados.
     */
    response.data.allClientes.forEach(cliente => {
        cliente.penduras.forEach(pendura => {
            if (pendura.valor > pendura.valorPagto)
                clientesPendurados.push({
                    id: cliente.id,
                    nome: cliente.nome,
                    apelido: cliente.apelido,
                    cpf: cliente.cpf,
                    telefone: cliente.telefone
                });
        })
    });

    /**
     * Retorna todos os clientes pendurados.
     */
    return {
        data: clientesPendurados
    }
}