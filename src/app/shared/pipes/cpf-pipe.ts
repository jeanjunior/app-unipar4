import { formatToCPF, formatToCNPJ, mapToNumeric } from './../helpers/utils.helper';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {

  transform(value: string | null) {
    return formatToCPF(value || '');
  }

}

@Pipe({ name: 'cpfOrCnpj' })
export class CpfOrCnpjPipe implements PipeTransform {

  transform(value: string | null) {
    const str = mapToNumeric(value || '');
    if (str.length === 11) {
      return formatToCPF(str);
    } else if (str.length === 14) {
      return formatToCNPJ(str);
    } else {
      return '';
    }
  }

}
