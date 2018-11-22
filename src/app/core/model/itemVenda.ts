import { Venda } from './venda';
import { Produto } from './produto';

export class ItemVenda {
    id: string;
    quantidade = 0;
    desconto ? = 0;
    cancelado = false;
    produto: Produto;
    venda: Venda;
    data: Date;
    private _total: number;
    private _subtotal: number;

    get total() {
        this._total = this._subtotal - this.desconto;
        return this._total;
    }

    get subtotal() {
        this._subtotal = this.quantidade * this.produto.preco;
        return this._subtotal;
    }

}
