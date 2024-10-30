// Suggested code may be subject to a license. Learn more: ~LicenseLog:398038746.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1574960696.
import { Component } from '@angular/core';
import { InputGroupComponent } from '../input-group/input-group.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,  // Agregamos standalone
  imports: [CommonModule, FormsModule, InputGroupComponent, ButtonComponent],  // Importa los componentes utilizados
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  onLogin() {
    console.log('¡Botón de login presionado!');
  }
}
