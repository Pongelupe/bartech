import { Venda } from './venda';
import { FormaDePagamento } from './formaDePagaMento';
import { Cliente } from './cliente';

export class Pendura {
  id: string;
    data: Date;
    valor: number;
    valorPagto?: number;
    cliente = new Cliente();
    venda = new Venda();
}
