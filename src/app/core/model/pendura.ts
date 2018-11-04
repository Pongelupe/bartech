import { Cliente } from './cliente';
import { Venda } from './venda';

export class Pendura {
  id: string;
  data: Date;
  valor: number;
  valorPagto?: number;
  cliente = new Cliente();
  venda = new Venda();
}
