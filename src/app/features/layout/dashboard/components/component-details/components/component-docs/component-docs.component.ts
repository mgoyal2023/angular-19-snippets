import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DtGridItem, DtGridster, DtGridsterWidget } from 'ng-dits-gridster';
import { ComponentDetailsService } from '../../../../../../../core/services/componentDetails.service';
import { TimerComponent } from '../../../../../../../ui/components/timer/timer.component';
import { ChartComponent } from '../../../../../../../ui/components/chart.component';

@Component({
  selector: 'app-component-docs',
  standalone: true,
  imports: [CommonModule, DtGridsterWidget, TimerComponent, DtGridster, ChartComponent],
  templateUrl: './component-docs.component.html',
  styleUrls: ['./component-docs.component.scss'],
})
export class ComponentDocsComponent implements OnChanges, AfterViewInit {
  @Input() config: any = null;
  @ViewChild('myTemplate') myTemplate!: TemplateRef<any>;
  gridItems: DtGridItem[] = [];

  constructor(private componentDetailService: ComponentDetailsService) {}

  ngAfterViewInit() {
    this.gridItems = [
      {
        cols: 2,
        rows: 2,
        y: 0,
        x: 0,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'bar',
          chartData: {
            title: 'Monthly Revenue',
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Revenue',
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 0,
        x: 2,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'line',
          chartData: {
            title: 'Website Traffic',
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Visitors',
              data: [1500, 1800, 2000, 1900, 2200, 2400, 2300],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 0,
        x: 4,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'pie',
          chartData: {
            title: 'Market Share',
            labels: ['Product A', 'Product B', 'Product C', 'Product D'],
            datasets: [{
              data: [35, 25, 22, 18],
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)'
              ]
            }]
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 2,
        x: 0,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'doughnut',
          chartData: {
            title: 'Budget Allocation',
            labels: ['R&D', 'Marketing', 'Sales', 'Operations'],
            datasets: [{
              data: [30, 25, 25, 20],
              backgroundColor: [
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)'
              ]
            }]
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 2,
        x: 2,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'radar',
          chartData: {
            title: 'Skill Distribution',
            labels: ['Technical', 'Communication', 'Leadership', 'Creativity', 'Problem Solving'],
            datasets: [{
              label: 'Current',
              data: [85, 75, 70, 80, 90],
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)'
            }, {
              label: 'Target',
              data: [90, 85, 85, 85, 95],
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)'
            }]
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 2,
        x: 4,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'polarArea',
          chartData: {
            title: 'Resource Usage',
            labels: ['CPU', 'Memory', 'Storage', 'Network', 'GPU'],
            datasets: [{
              data: [70, 85, 60, 45, 90],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
              ]
            }]
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 4,
        x: 0,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'bar',
          chartData: {
            title: 'Quarterly Performance',
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: '2023',
              data: [65, 59, 80, 81],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }, {
              label: '2024',
              data: [70, 65, 85, 89],
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          chartOptions: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 4,
        x: 2,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'line',
          chartData: {
            title: 'Temperature Trends',
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Tokyo',
              data: [7, 8, 11, 14, 19, 23],
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.3,
              fill: false
            }, {
              label: 'London',
              data: [4, 5, 8, 11, 15, 17],
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.3,
              fill: false
            }]
          }
        }
      },
      {
        cols: 2,
        rows: 2,
        y: 4,
        x: 4,
        componentRef: ChartComponent,
        inputData: {
          chartType: 'bubble',
          chartData: {
            title: 'Project Analysis',
            datasets: [{
              label: 'Projects',
              data: [
                { x: 20, y: 30, r: 15 },
                { x: 40, y: 60, r: 20 },
                { x: 60, y: 40, r: 25 },
                { x: 80, y: 20, r: 10 }
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
              ]
            }]
          },
          chartOptions: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time (days)'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Resources'
                }
              }
            }
          }
        }
      }
    ];
  }
  onItemChange(event: any) {
    console.log('Item changed:', event);
  }
  onItemResized(event: any) {
    console.log('Item resized:', event);
  }
  onItemRemoved(event: any) {
    console.log('Item removed:', event);
  }
  onGridSizeChanged(event: { width: number; height: number }) {
    console.log('Grid size changed:', event);
  }
  handleComponentOutput(event: any): void {
    console.log('Component Output:', event);
  }
  onTemplateOutput(event: any) {
    console.log('Template Output:', event);
  }

  ngOnChanges() {
    if (Array.isArray(this.config?.exampleComponent)) {
      this.config.exampleComponent.forEach((item: any) => {
        if (item.codeSnippet?.html) {
          item.activeCodeType = 'html';
        } else if (item.codeSnippet?.ts) {
          item.activeCodeType = 'ts';
        } else if (item.codeSnippet?.command) {
          item.activeCodeType = 'command';
        }
      });
    }
  }

  setActiveCodeType(item: any, type: string) {
    item.activeCodeType = type;
  }

  copyCode(data: string) {
    this.componentDetailService.copyData(data, 'Code copied to clipboard!');
  }
}
