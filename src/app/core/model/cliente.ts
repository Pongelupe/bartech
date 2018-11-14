import { Pendura } from './pendura';
import { Pagamento } from './pagamento';

export class Cliente {
    id: string;
    nome = '';
    apelido = '';
    cpf = '';
    createdAt: Date;
    telefone = '';
    penduras: Array<Pendura>;
    pagamentos = new Array<Pagamento>();
    totalPenduras: number;
    totalPgtosPenduras: number;
    saldoDevedorPendura: number;
}
