import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../../core/model/produto';
import { forEach } from 'async';

@Pipe({
  name: 'produto',
  pure: false
})
export class ProdutoPipe implements PipeTransform {

  transform(produtos: Produto[], arg: string): Produto[] {
    debugger;
    if (!produtos || !arg || !arg[0]) {
      return produtos;
    }
    return produtos.filter(produto => produto.nome.toLowerCase().indexOf(arg[0].toLowerCase()) !== -1 || produto.codigo.toString().toLowerCase().indexOf(arg[0].toLowerCase()) !== -1 || produto.codigoDeBarras.toString().toLowerCase().indexOf(arg[0].toLowerCase()) !== -1);
  }
}
