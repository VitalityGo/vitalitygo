import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(email: string, password: string): boolean {
    // Aquí implementarías la lógica real de autenticación
    if (email === 'test@test.com' && password === 'password') {
      this.isAuthenticated.next(true);
      // Aquí podrías guardar el token en localStorage
      localStorage.setItem('token', 'your-token-here');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
  }

  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  // Método para verificar si hay un token guardado
  checkAuthStatus(): boolean {
    const token = localStorage.getItem('token');
    const isAuth = !!token;
    this.isAuthenticated.next(isAuth);
    return isAuth;
  }
}