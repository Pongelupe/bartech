import { Mesa } from './mesa';
import { Pendura } from './pendura';
import { ItemVenda } from './itemVenda';

export class Venda {
  id: string;
  data?: Date;
  finalizada?: boolean;
  quitada?: boolean;
  mesa?: Mesa;
  itensVenda?: ItemVenda[];
  penduras?: Pendura[];
  pagamento?: any[];
  private _total: number;

  get total() {
    this._total = 0;
    if (this.itensVenda !== undefined) {
      this.itensVenda.forEach(item => {
        this._total += item.quantidade * item.produto.preco;
      });
    }

    return this._total;
  }
}
