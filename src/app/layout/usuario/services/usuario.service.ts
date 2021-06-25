import { take } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseRestService {

  public buscarTodos(): Observable<Usuario[]> {
    return this.getter<Usuario[]>('usuarios').pipe(take(1));
  }

  public buscarTodosQuery(filtros: any): Observable<Usuario[]> {
    // Verifica se tem os parâmetros e vai adicionando no array para jogar na URL
    const query = new Array<string>();
    if (filtros.id) {
      query.push(`id=${filtros.id}`);
    }
    if (filtros.username) {
      query.push(`username=${filtros.username}`);
    }
    if (filtros.email) {
      query.push(`email=${filtros.email}`);
    }

    const params = query.length > 0 ? '?' + query.join('&') : '';
    return this.getter<Usuario[]>(`usuarios?${params}`).pipe(take(1));
  }

  public buscarTodosQuery2(filtros: any): Observable<Usuario[]> {
    const options = {
      params: this.parseObjectToHttpParams(filtros)
    };
    return this.getter<Usuario[]>('usuarios', options).pipe(take(1));
  }

  public buscarPorId(id: number): Observable<Usuario> {
    return this.getter<Usuario>(`usuarios/${id}`).pipe(take(1));
  }

  public salvar(usuario: Usuario): Observable<Usuario> {
    // Verifica se o usuário já tem ID, se tiver chama o PUT para atual, senão o POST para inserir
    if (usuario.id) {
      usuario.dateUpdate = new Date();
      return this.put<Usuario>(`usuarios/${usuario.id}`, usuario);
    } else {
      usuario.dateInsert = new Date();
      return this.post<Usuario>('usuarios', usuario);
    }
  }

  public excluir(id: number): Observable<void> {
    return this.delete(`usuarios/${id}`).pipe(take(1));
  }

}
