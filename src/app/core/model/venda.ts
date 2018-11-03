import { Mesa } from './mesa';
import { Pendura } from './pendura';
import { ItemVenda } from './itemVenda';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Venda {
  id: string;
  data?: Date;
  finalizada?: boolean;
  quitada?: boolean;
  mesa?: Mesa;
  itensVenda?: ItemVenda[];
  penduras?: Pendura[];
  pagamentos?: any[];
  private _subtotal: number;
  private _total: number;
  private _descontos: number;
  private _totaisPagamentos: number;

  get subtotal() {
    this._subtotal = 0;
    if (this.itensVenda !== undefined) {
      this.itensVenda.forEach(item => {
        this._subtotal += item.quantidade * item.produto.preco;
      });
    }

    return this._subtotal;
  }

  get descontos() {
    this._descontos = 0;
    if (this.itensVenda !== undefined) {
      this.itensVenda.forEach(item => {
        this._descontos += item.desconto;
      });
    }

    return this._descontos;
  }

  get total() {
    this._total = 0;
    this._total = this._subtotal - this._descontos;
    return this._total;
  }

  get totaisPagamentos() {
    this._totaisPagamentos = 0;
    if (this._totaisPagamentos !== undefined && this.pagamentos) {
      this.pagamentos.forEach(pagamento => {
        this._totaisPagamentos += pagamento.valor;
      });
    }
    return this._totaisPagamentos;
  }

  get valorRestanteVenda() {
    return this._total - this._totaisPagamentos;
  }
}
