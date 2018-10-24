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
}
