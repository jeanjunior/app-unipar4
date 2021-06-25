import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.verificarAcesso(state);
  }

  private verificarAcesso(route: RouterStateSnapshot): boolean {
    if (this.authService.usuarioEstaAutenticado(route.url)) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { forward: route.url } });
    return false;
  }

}
