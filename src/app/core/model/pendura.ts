import { Venda } from './venda';
import { FormaDePagamento } from './formaDePagamento';
import { Cliente } from './cliente';

export class Pendura {
  id: string;
    data: Date;
    valor: number;
    valorPagto?: number;
    cliente = new Cliente();
    venda = new Venda();
}
