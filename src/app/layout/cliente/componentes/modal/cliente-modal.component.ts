import { GenericValidator } from './../../../../shared/helpers/validators.helper';
import { mapToNumbers, mapToNumeric, maskCPF } from './../../../../shared/helpers/utils.helper';
import { Endereco, Cidade } from './../../models/cliente.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { hasErrors, validateAllFormFields } from 'src/app/shared/helpers/iu.helper';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss']
})
export class ClienteModalComponent implements OnInit {

  @Input()
  cliente: Cliente | undefined;

  @Output()
  onSave: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  formGroup?: FormGroup;

  public maskCPF = maskCPF;

  public cidades: Cidade[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.carregaCidades();
    this.createForm(this.cliente || {} as Cliente);
  }

  private async carregaCidades(): Promise<void> {
    this.cidades = await this.clienteService.buscarCidades().toPromise();
  }

  createForm(cliente: Cliente) {
    this.formGroup = this.formBuilder.group({
      nome: [
        cliente.nome,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])
      ],
      cpf: [
        cliente.cpf,
        Validators.compose([Validators.required, GenericValidator.isValidCpf()])
      ],
      dataNascimento: [
        cliente.dataNascimento,
        Validators.compose([Validators.required, Validators.max(new Date().getTime())])
      ],
      endereco: this.createFormEndereco(cliente.endereco || {})
    });
  }

  private createFormEndereco(endereco: Endereco): FormGroup {
    return this.formBuilder.group({
      logradouro: [
        endereco.logradouro,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      ],
      numero: [
        endereco.numero,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(999999999)])
      ],
      bairro: [
        endereco.bairro,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      ],
      cidade: [
        endereco.cidade,
        Validators.compose([Validators.required])
      ]
    });
  }

  public salvar(): void {
    if (this.formGroup?.invalid) {
      this.toastr.error('Campos inválidos ou não preenchidos!');
      validateAllFormFields(this.formGroup);
      return;
    }

    // Pega as informações que estão no formGroup (que são os campos da tela)
    const clienteForm = this.formGroup?.getRawValue();
    // Faz o merge dos objeto cliente inicial com os campos alterados na tela
    const cliente = { ...this.cliente, ...clienteForm } as Cliente;
    cliente.cpf = mapToNumeric(cliente.cpf);

    // Chama o service para salvar na API
    this.clienteService.salvar(cliente)
      .subscribe(result => {
        // Emite o evento que salvou com sucesso e passa o cliente que retornou do serviço atualizado
        this.onSave.emit(result);

        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });

  }

  public excluir(): void {
    this.clienteService.excluir(this.cliente!.id!).subscribe(() => {
      // Emite o evento que excluiu
      this.onDelete.emit();

      // Fecha o modal
      this.activeModal.close();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.formGroup?.get(controlName)!;
  }

  hasErrors = hasErrors;

  public getName(item: any): string {
    return item ? `${item.nome} - ${item.uf}` : '';
  }

}
