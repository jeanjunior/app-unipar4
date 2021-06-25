import { FormControl } from '@angular/forms';
import { UsuarioModalComponent } from './componentes/modal/usuario-modal/usuario-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './services/usuario.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosSearch: Usuario[] = [];
  searchControl: FormControl = new FormControl();

  // Para todos os service que o componente for usar precisa ser injetado recebendo pelo construtor
  constructor(
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private modalService: NgbModal
  ) {

    // pega os valueChange do campo de pesquisa, ai toda vez que o usuário digitar no campo irá cair e nós filtramos o usuário pelo nome
    // debounceTime(500) => cria um timeOut para entrar no subscribe apenas quando o usuário para de digitar após 0.5segundos
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {

        // Chama a função para filtrar os usuarios
        this.filtrarUsuarios(value.toLocaleLowerCase());

      });
  }

  ngOnInit(): void {
    // Quando iniciar a tela carrega os usuários através da api
    this.carregaUsuariosFromApi();

  }

  private filtrarUsuarios(value: string): void {
    // Filtra os usuário e responde no array de usuários filtrados
    this.usuariosSearch = this.usuarios.filter(u =>
      // coloca o nome do usuário em minusculo para ignorar os maiusculos dos minusculos
      u.name.toLocaleLowerCase().includes(value)
    );
  }

  private carregaUsuariosFromApi(): void {
    // Chama o service de usuarios para buscar todos
    //    .buscarTodos() retorna um Observable<Usuario[]>
    //    como a chamada é assincrona para capturar o resultado é preciso "se inscrever" para receber o retorno

    this.usuarioService.buscarTodos()
      .subscribe(result => {
        // pega o retorno recebido pela api e joga na nossa lista de usuários
        this.usuarios = result;

        // Chama a função para filtrar os usuários para trazer toda a lista
        this.filtrarUsuarios('');

      }, error => {
        // Deu erro na requisição
        this.toastr.error(error.message, 'Ops.');
      });
  }

  public abrirModal(usuario: Usuario | undefined): void {
    // Instancia o modal
    const modalRef = this.modalService.open(UsuarioModalComponent, { size: 'lg' });

    // Passa o parâmetro do usuário para dentro
    modalRef.componentInstance.usuario = usuario;

    // Pega a resposta quando o usuário salvar no modal
    modalRef.componentInstance.onSave.subscribe((result: Usuario) => {
      this.toastr.success('Usuário salvo com sucesso!');

      if (!usuario?.id) {
        // Se não tiver id no usuário de entrada então é uma insert
        this.usuarios.push(result);
      } else {
        // Remove o usuário anterior e insere o novo
        const idx = this.usuarios.findIndex(u => u.id === result!.id);
        this.usuarios.splice(idx, 1, result);
      }
      this.limpaPesquisa();
    });

    // Pega a resposta quando o usuário excluír no modal
    modalRef.componentInstance.onDelete.subscribe(() => {
      this.toastr.success('Usuário excluído com sucesso!');

      // Acha o usuário no array inicial e demove ele
      const idx = this.usuarios.findIndex(u => u.id === usuario!.id);
      this.usuarios.splice(idx, 1);
      this.limpaPesquisa();
    });
  }

  private limpaPesquisa(): void {
    this.searchControl?.setValue('');
  }

}
