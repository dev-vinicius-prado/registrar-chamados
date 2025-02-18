import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redireciona para a tela de login se o token não existir
      alert('Você precisa estar logado para acessar esta página.');
      this.router.navigate(['/login']);
      return false;
    }
    return true; // Permite o acesso à rota
  }
}
