// Suggested code may be subject to a license. Learn more: ~LicenseLog:3613695930.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { BottomNavComponent } from 'src/app/core/components/bottom-nav/bottom-nav.component';
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
export class AppLayoutComponent {}
