import { Venda } from './venda';
import { Produto } from './produto';

export class ItemVenda {
    id: string;
    quantidade = 0;
    desconto?: number;
    cancelado = false;
    produto: Produto;
    venda: Venda;
    private _total: number;

    get total() {
        this._total = this.quantidade * this.produto.preco;
        return this._total;
    }

}
