import { Venda } from './venda';
import { Produto } from './produto';

export class ItemVenda {
    quantidade: number = 0;
    desconto?: number;
    cancelado: boolean = false;
    produto: Produto;
    venda: Venda;
    valor: number;
    private _total: number;

    get total() {
        this._total = this.quantidade * this.valor;
        return this._total
    }

}
