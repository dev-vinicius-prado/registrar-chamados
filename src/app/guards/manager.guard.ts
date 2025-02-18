import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'MANAGER') {
      return true; // Permite o acesso à rota
    }
    // Redireciona para a tela de login se o role não existir
    alert('Você precisa estar logado para acessar esta página.');
    return false;
  }
}
