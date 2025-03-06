import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.type';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    userRole: null,
    token: null
  });

  public authState$ = this.authState.asObservable();
  private apiUrl = 'https://67b3aab7392f4aa94fa7f285.mockapi.io/';

  constructor(private http: HttpClient) {
    this.initializeAuthState();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => this.validateUser(users, credentials)),
      tap(response => this.updateAuthState(response))
    );
  }
  private validateUser(users: any[], credentials: { email: string; password: string }) {
    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      token: `mock-token-${user.id}`,
      role: user.role
    };
  }
  private initializeAuthState(): void {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (token && role) {
      this.authState.next({
        isAuthenticated: true,
        userRole: role,
        token: token
      });
    }
  }

  private updateAuthState(response: any): void {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('role', response.role);

    this.authState.next({
      isAuthenticated: true,
      userRole: response.role,
      token: response.token
    });
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.authState.next({
      isAuthenticated: false,
      userRole: null,
      token: null
    });
  }
}
