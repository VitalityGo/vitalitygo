import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';

interface User {
  email: string;
  name?: string;
  profileImage?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    // Observar el estado de autenticación
    user(this.auth).subscribe(user => {
      if (user) {
        this.isAuthenticated.next(true);
        this.loadUserData(user.uid);
      } else {
        this.isAuthenticated.next(false);
        this.currentUserSubject.next(null);
      }
    });
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      if (result.user) {
        // Crear documento del usuario en Firestore
        const userRef = doc(this.firestore, `users/${result.user.uid}`);
        await setDoc(userRef, {
          email,
          createdAt: new Date(),
          name: '',
          profileImage: ''
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      if (result.user) {
        const userRef = doc(this.firestore, `users/${result.user.uid}`);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          this.currentUserSubject.next(userData);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isAuthenticated.next(false);
      this.currentUserSubject.next(null);
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

  private async loadUserData(uid: string): Promise<void> {
    try {
      const userRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        this.currentUserSubject.next(userData);
      }
    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
    }
  }

  async updateUserProfile(name: string, profileImage: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const userRef = doc(this.firestore, `users/${user.uid}`);
        await updateDoc(userRef, {
          name,
          profileImage
        });

        const currentUser = this.getCurrentUser();
        if (currentUser) {
          currentUser.name = name;
          currentUser.profileImage = profileImage;
          this.currentUserSubject.next(currentUser);
        }
      } else {
        throw new Error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  }

  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}