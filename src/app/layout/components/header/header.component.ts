import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserSession } from 'src/app/shared/models/user-session';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  mostrarMenu = false;
  usuario?: UserSession;

  private inscricaoUserChange?: Subscription;

  constructor(
    public readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.usuario) {
      this.usuario = this.authService.usuario;
    } else {
      this.inscricaoUserChange = this.authService.onUserChange.subscribe((usr: any) => {
        this.usuario = usr;
      });
    }
  }

  ngOnDestroy(): void {
    this.inscricaoUserChange?.unsubscribe();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.usuarioAutenticado = false;
    this.authService.usuario = undefined;
    this.router.navigate(['/login']);
  }

}
