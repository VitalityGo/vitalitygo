import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-group',
  standalone: true,  // Marcado como standalone
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css']
})
export class InputGroupComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
}
