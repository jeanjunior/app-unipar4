import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSession } from 'src/app/shared/models/user-session';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario: any = { userName: null, password: null };
  private inscricao?: Subscription;
  private forward?: string;
  execLogin = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.queryParams.subscribe((param: any) => {
      this.forward = param.forward;
    });
    this.getUserLoggedIn();
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }

  private async getUserLoggedIn(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token && token !== 'null' && token !== 'undefined') {
      await this.getUserFromToken();
    } else {
      this.cleanLocalResources();
      this.execLogin = false;
    }
  }

  redirectAfterLogin(user: UserSession): void {
    this.authService.usuario = user;
    this.authService.usuarioAutenticado = true;
    this.authService.onUserChange.emit(user);

    this.router.navigate([this.forward || '/']);
  }

  cleanLocalResources(): void {
    localStorage.removeItem('token');
  }

  private async getUserFromToken(): Promise<void> {
    this.authService.getUserFromToken().subscribe(response => {
      this.redirectAfterLogin(response);
    }, error => {
      this.cleanLocalResources();
      this.authService.usuarioAutenticado = true;
    });
  }

  fazerLogin(): void {
    if ((this.usuario.userName || '').trim().length === 0 || (this.usuario.password || '').trim().length === 0) {
      this.toastr.warning('Informe o Usuário e Senha!');
      return;
    }

    this.authService.login(this.usuario.userName, this.usuario.password).subscribe(response => {
      localStorage.setItem('token', response.token!!);
      this.redirectAfterLogin(response);
    }, error => {
      this.cleanLocalResources();
      if (error.error && error.error.status === 401) {
        this.toastr.error('Login/Senha inválidos');
      } else {
        this.toastr.error(error.error.message || error.message || 'Login/Senha inválidos');
      }
    });

  }

}
