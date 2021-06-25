import { validateAllFormFields } from './../../../../../shared/helpers/iu.helper';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/usuario.model';
import { Component, createPlatform, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { hasErrors } from 'src/app/shared/helpers/iu.helper';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent implements OnInit {

  // Parâmetro para receber o usuário como entrada
  @Input()
  usuario: Usuario | undefined;

  // Função para emitir de volta que o usuário for salvo (emite o novo usuário inserido/alterado)
  @Output()
  onSave: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  // Função para emitir de volta que o usuário for excluído
  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  formGroup?: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.createForm(this.usuario || {} as Usuario);
  }

  createForm(usuario: Usuario) {
    this.formGroup = this.formBuilder.group({
      username: [
        { value: usuario.username, disabled: usuario.id !== undefined },
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])
      ],
      password: [
        usuario.password,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      name: [
        usuario.name,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      email: [
        usuario.email,
        Validators.compose([Validators.required, Validators.email])
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
    const usuarioForm = this.formGroup?.getRawValue();
    // Faz o merge dos objeto usuário inicial com os campos alterados na tela
    const usuario = { ...this.usuario, ...usuarioForm };

    // Chama o service para salvar na API
    this.usuarioService.salvar(usuario)
      .subscribe(result => {
        // Emite o evento que salvou com sucesso e passa o usuário que retornou do serviço atualizado
        this.onSave.emit(result);

        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });

  }

  public excluir(): void {
    this.usuarioService.excluir(this.usuario!.id!).subscribe(() => {
      // Emite o evento que excluiu
      this.onDelete.emit();

      // Fecha o modal
      this.activeModal.close();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  get username() {
    return this.formGroup?.get('username');
  }

  get password() {
    return this.formGroup?.get('password');
  }

  get name() {
    return this.formGroup?.get('name');
  }

  get email() {
    return this.formGroup?.get('email');
  }

  hasErrors = hasErrors;

}
