import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    private authService : AutenticacaoService,
    private router : Router
  ) { }

  canActivate() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }
}
