import { take } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSession } from '../models/user-session';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado = false;
  usuario?: UserSession;

  onUserChange = new EventEmitter();
  rotaAtual = new EventEmitter<string>();

  constructor(private baseRest: BaseRestService) { }

  usuarioEstaAutenticado(url: string): boolean {
    if (url.startsWith('/login')) {
      return true;
    }
    this.rotaAtual.emit(url);

    if (this.usuario) {
      return true;
    } else {
      return false;
    }
  }

  public getUserFromToken(): Observable<UserSession> {
    return this.baseRest.getter<UserSession>('auth/info').pipe(take(1));;
  }

  public login(username: string, password: string): Observable<UserSession> {
    // Padrão Basic Auth => Basic Base64(username:password)
    const tokenBasic: string = `Basic ${window.btoa(username + ':' + password)}`;
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: tokenBasic })
      //observe: 'response' as 'body'
    };
    return this.baseRest.post<UserSession>('auth/login', null, httpOptions).pipe(take(1));
  }

}
