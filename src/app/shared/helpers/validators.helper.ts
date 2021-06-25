import { isCPF } from './utils.helper';
import { AbstractControl, Validators } from '@angular/forms';

export class GenericValidator {

  static isValidCpf() {
    return (control: AbstractControl): Validators | null => {
      if (control.value) {
        if (!isCPF(control.value)) {
          return { cpfNotValid: true };
        }
      }
      return null;
    };
  }

}
