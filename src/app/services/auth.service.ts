import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private users: User[] = [];

  constructor() {
    // Cargar usuarios guardados al iniciar
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  register(email: string, password: string): boolean {
    // Verificar si el usuario ya existe
    if (this.users.some(user => user.email === email)) {
      return false;
    }

    // Agregar nuevo usuario
    this.users.push({ email, password });
    // Guardar en localStorage
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.isAuthenticated.next(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', 'token-' + Date.now()); // Token simulado
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  checkAuthStatus(): boolean {
    const token = localStorage.getItem('token');
    const isAuth = !!token;
    this.isAuthenticated.next(isAuth);
    return isAuth;
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}