import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';

  password: string = '';

  errorMessage: string = '';


  constructor(

    private router: Router,

    private authService: AuthService

  ) {}


  onSubmit() {

    if (this.authService.login(this.email, this.password)) {

      this.router.navigate(['/home']);

    } else {

      this.errorMessage = 'Invalid email or password';

    }

  }
}