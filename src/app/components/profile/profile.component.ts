import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [LayoutComponent]
})
export class ProfileComponent {
  user = {
    name: localStorage.getItem('name') || 'Operador Modularis', // Nome fictício
    email: localStorage.getItem('email') || 'operador@modularis.com', // Email fictício
  };

  constructor(private router: Router) {}

  logout() {
    // Remove o token e o papel do usuário
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }
}
