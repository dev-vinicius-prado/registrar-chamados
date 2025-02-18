import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.example.com/auth';
  private mockApi = 'https://67b3aab7392f4aa94fa7f285.mockapi.io/';

  login(credentials: { email: string; password: string }) {
    // return axios.post(`${this.apiUrl}/login`, credentials);
    return axios.get(`${this.mockApi}/users`).then((response) => {
      const users = response.data;
      const user = users.find(
        (u: any) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        return { token: `mock-token-${user.id}`, role: user.role };
      }
      throw new Error('Credenciais inválidas!')
    });
  }
}
