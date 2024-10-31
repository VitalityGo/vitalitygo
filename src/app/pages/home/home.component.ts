import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';  // Cambiado desde NgChartsModule
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective]  // Cambiado desde NgChartsModule
})
export class HomeComponent implements OnInit {
  steps: number = 0;
  waterIntake: number = 0;
  weightData: number[] = [];
  weight: number = 0;

  // Configuración del gráfico
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.weightData,
        label: 'Peso (kg)',
        backgroundColor: 'rgba(60,140,231,0.2)',
        borderColor: '#3C8CE7',
        pointBackgroundColor: '#3C8CE7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3C8CE7',
        fill: 'origin',
      }
    ],
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5']
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Registro de Peso'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  constructor() {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.steps = 5000;
    this.waterIntake = 2;
    this.weightData = [70, 71, 69, 68, 70];
    this.updateChartData();
  }

  updateSteps() {
    this.steps += 1000;
  }

  updateWaterIntake() {
    this.waterIntake += 0.5;
  }

  updateWeight() {
    if (this.weight > 0) {
      this.weightData.push(this.weight);
      this.updateChartData();
      this.weight = 0;
    }
  }

  private updateChartData() {
    this.lineChartData.datasets[0].data = [...this.weightData];
    this.lineChartData = {...this.lineChartData};
    
    const numberOfDays = this.weightData.length;
    this.lineChartData.labels = Array.from({length: numberOfDays}, (_, i) => `Día ${i + 1}`);
  }
}