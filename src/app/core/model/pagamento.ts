import { Venda } from './venda';
import { FormaDePagamento } from './formaDePagamento';
import { Cliente } from './cliente';

export class Pagamento {
    id: string;
    data: Date;
    valor: number;
    cliente ? = new Cliente();
    venda ? = new Venda();
    formaPagamento: FormaDePagamento;
}
