/**
 * Função que recebe um evento com os valor pendurado e valor pago na pendura e retorna se a pendura está quitada
 */
export default event => {
    const valor = event.data.valor;
    const valorPagto = event.data.valorPagto;
    const quitada = valor === valorPagto;
    return {
        data: {
            quitada,
            valor,
            valorPagto
        }
    }
}