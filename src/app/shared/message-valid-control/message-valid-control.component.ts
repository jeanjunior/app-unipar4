import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { hasErrors } from '../helpers/iu.helper';

@Component({
  selector: 'app-message-valid-control',
  templateUrl: './message-valid-control.component.html',
  styleUrls: ['./message-valid-control.component.scss']
})
export class MessageValidControlComponent {

  @Input()
  control: AbstractControl | null = null;

  @Input()
  errorMessages: { [key: string]: string } = {};

  private readonly defaultErrorMessages = {
    required: () => 'Este campo é requerido.',
    email: () => 'Por favor, forneça um endereço de email válido.',
    min: (params: any) => `Por favor, forneça um valor maior ou igual a ${params.min}.`,
    minlength: (params: any) => `Por favor, forneça ao menos ${params.requiredLength} caracteres.`,
    max: (params: any) => `Por favor, forneça um valor menor ou igual a ${params.max}.`,
    maxlength: (params: any) => `Por favor, forneça não mais que ${params.requiredLength} caracteres.`,
    pattern: (params: any) => `O formato fornecido é inválido. ${params.requiredPattern}.`,
    cpfNotValid: () => 'O CPF é inválido.'
  };

  constructor() { }

  get hasErrors(): boolean {
    return hasErrors(this.control);
  }

  listOfErrors(): string[] {
    if (!this.control) {
      return [];
    } else {
      return Object.keys(this.control.errors!!).map(field =>
        this.getMessage(field, this.control!!.errors!![field])
      );
    }
  }

  getMessage(type: string, params: any): string {
    const messages: any = { ...this.defaultErrorMessages, ...this.errorMessages };
    return messages[type](params);
  }

}
