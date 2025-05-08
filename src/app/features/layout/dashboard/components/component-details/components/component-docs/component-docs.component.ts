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

@Component({
  selector: 'app-component-docs',
  standalone: true,
  imports: [CommonModule, DtGridsterWidget, TimerComponent, DtGridster],
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
        rows: 1,
        y: 0,
        x: 0,
        componentRef: TimerComponent,
        inputData: {
          duration: 20,
        },
      },
      {
        cols: 2,
        rows: 1,
        y: 0,
        x: 1,
        templateRef: this.myTemplate,
        templateData: { message: 'Dynamic data from TemplateRef!' },
      },
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
