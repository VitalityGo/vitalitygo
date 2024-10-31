import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Corregir esta línea
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  userProfileImage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userName = currentUser.name || 'Usuario';
      this.userProfileImage = currentUser.profileImage || 'assets/profile-placeholder.jpg';
    }

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.name || 'Usuario';
        this.userProfileImage = user.profileImage || 'assets/profile-placeholder.jpg';
      }
    });
  }
}