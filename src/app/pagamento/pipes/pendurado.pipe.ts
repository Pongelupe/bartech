import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../../core/model/cliente';

@Pipe({
  name: 'pendurado',
  pure: false
})
export class PenduradoPipe implements PipeTransform {

  transform(pendurados: Cliente[], arg: string): Cliente[] {
    if (!pendurados || !arg || !arg[0]) {
      return pendurados;
    }
    return pendurados.filter(cliente => cliente.nome.toLowerCase().indexOf(arg[0].toLowerCase()) !== -1
      || cliente.apelido.toLowerCase().indexOf(arg[0].toLowerCase()) !== -1
      || cliente.cpf.toString().toLowerCase().indexOf(arg[0].toLowerCase()) !== -1
      || cliente.telefone.toString().toLowerCase().indexOf(arg[0].toLowerCase()) !== -1);
  }
}
