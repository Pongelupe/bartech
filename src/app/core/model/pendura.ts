import { Venda } from './venda';

export interface Pendura {
  id: string;
  data?: Date;
  preco?: number;
  quantidadeEstoque: number;
  venda?: Venda;
  cliente?: any;
}
