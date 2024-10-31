// settings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Definir interfaces para mejor tipado
interface User {
  name: string;
  email: string;
  profileImage?: string;
}

interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  units: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // Declarar las propiedades con sus tipos
  user: User = {
    name: '',
    email: '',
    profileImage: ''
  };
  
  settings: UserSettings = {
    notifications: true,
    darkMode: false,
    language: 'es',
    units: 'metric'
  };

  newPassword: string = '';
  confirmPassword: string = '';
  currentPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile: File | null = null;
  
  constructor(private authService: AuthService, private router: Router) {

    console.log('SettingsComponent constructor called');
  
  }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = {
        name: currentUser.name || '',
        email: currentUser.email || '',
        profileImage: currentUser.profileImage || ''
      };
    }
    
    // Cargar configuraciones guardadas
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = { ...JSON.parse(savedSettings) };
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProfile() {
    try {
      if (this.selectedFile) {
        // Aquí irían las funciones para subir la imagen a un servidor
        // Por ahora solo guardamos la preview
        this.user.profileImage = await this.getBase64(this.selectedFile);
      }

      this.authService.updateUserProfile(this.user.name, this.user.profileImage || '');
      this.successMessage = 'Perfil actualizado correctamente';
      setTimeout(() => this.successMessage = '', 3000);
    } catch (error) {
      this.errorMessage = 'Error al actualizar el perfil';
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }

  saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
    this.successMessage = 'Configuración guardada correctamente';
    setTimeout(() => this.successMessage = '', 3000);
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    try {
      // Aquí iría la lógica para cambiar la contraseña
      this.successMessage = 'Contraseña actualizada correctamente';
      this.newPassword = '';
      this.confirmPassword = '';
      this.currentPassword = '';
      setTimeout(() => this.successMessage = '', 3000);
    } catch (error) {
      this.errorMessage = 'Error al cambiar la contraseña';
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }

  deleteAccount() {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Aquí iría la lógica para eliminar la cuenta
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  private getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}