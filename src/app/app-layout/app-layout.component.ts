// Suggested code may be subject to a license. Learn more: ~LicenseLog:3852150750.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3613695930.


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { BottomNavComponent } from '../layout/bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    BottomNavComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {
}
