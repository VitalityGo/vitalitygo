import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private users: User[] = [
    { name: 'Test User', email: 'test@test.com', password: 'password' }
  ];

  constructor() {
    this.checkAuthStatus();
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isAuthenticated.next(true);
      localStorage.setItem('token', 'your-token-here');
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    if (this.users.some(u => u.email === email)) {
      return false; // El email ya está registrado
    }
    this.users.push({ name, email, password });
    return true;
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
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
}