import { Pendura } from './pendura';
import { Pagamento } from './pagamento';

export class Cliente {
    id: string;
    nome: string;
    apelido: string;
    cpf: string;
    createdAt: Date;
    telefone: string;
    penduras = new Array<Pendura>();
    pagamentos = new Array<Pagamento>();
    private _totalPenduras: number;
    private _totalPagamentosEmPenduras: number;
    private _saldoPendura: number;

    constructor(nome?: string, cpf?: string, apelido?: string, telefone?: string, penduras?: Pendura[], pagamento?: Pagamento[]) {
        this.nome = nome;
        this.cpf = cpf;
        this.apelido = apelido;
        this.telefone = telefone;
        this.penduras = penduras;
        this.pagamentos = pagamento;
    }
    get totalPenduras() {
        this._totalPenduras = 0;
        this.penduras.forEach(item => {
            this._totalPenduras += item.valor;
        });
        return this._totalPenduras;
    }
    get totalPagamentosEmPenduras() {
        this._totalPagamentosEmPenduras = 0;
        this.penduras.forEach(item => {
            this._totalPagamentosEmPenduras += item.valorPagto;
        });
        return this._totalPagamentosEmPenduras;
    }
    get saldoPendura() {
        this._saldoPendura = this._totalPenduras - this._totalPagamentosEmPenduras;
        return this._saldoPendura;
    }
}
