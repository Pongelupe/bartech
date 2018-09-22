import { Mesa } from './mesa';
import { Pendura } from './pendura';

export class Venda {
  id: string;
  data?: Date;
  finalizada?: boolean;
  quitada?: boolean;
  mesa?: Mesa;
  itensVenda?: any[];
  penduras?: Pendura[];
  pagamento?: any[];
}
