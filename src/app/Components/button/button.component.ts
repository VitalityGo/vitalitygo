import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,  // Agrega standalone para que funcione como componente independiente
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<void>();  // Emite un evento sin valor

  handleClick() {
    this.onClick.emit();  // Lanza el evento cuando se hace clic
  }
  
}
