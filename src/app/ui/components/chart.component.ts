import { Component, Input, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  template: '<canvas #chartCanvas></canvas>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  `]
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() chartType: keyof ChartTypeRegistry = 'bar';
  @Input() chartData: any;
  @Input() chartOptions: any;

  private chart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Initial render will happen after view init
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: '#666',
            font: {
              size: 12
            }
          }
        },
        title: {
          display: true,
          text: this.chartData.title || 'Chart.js Example',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    };

    this.chart = new Chart(ctx!, {
      type: this.chartType,
      data: this.chartData,
      options: { ...defaultOptions, ...this.chartOptions }
    });
  }
}