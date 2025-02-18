import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['Breanna_Hoppe@hotmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.router.navigate(['/dashboard']);
    // if (this.loginForm.valid) {
    //   this.authService.login(this.loginForm.value).then(
    //     (response) => {
    //       localStorage.setItem('token', response.data.token);
    //     }
    //   ).catch(
    //     (error) => {
    //       alert('Erro ao fazer login. Verifique suas credenciais.');
    //     }
    //   );
    // } else {
    //   alert('Por favor, preencha todos os campos corretamente.');
    // }
  }
}
