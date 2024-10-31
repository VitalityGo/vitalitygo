import { Component } from '@angular/core';

@Component({
  selector: 'app-misiones',
  standalone: true,
  imports: [MisionesComponent],
  templateUrl: './misiones.component.html',
  styleUrl: './misiones.component.css'
})
export class MisionesComponent {
  missions: Array<any> = []; // Array de misiones


  ngOnInit() {

    // Cargar misiones desde un servicio

  }
}
