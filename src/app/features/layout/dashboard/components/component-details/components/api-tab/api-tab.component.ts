import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentDetailsService } from '../../../../../../../core/services/componentDetails.service';

@Component({
  selector: 'app-api-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-tab.component.html',
  styleUrl: './api-tab.component.scss'
})
export class ApiTabComponent implements OnChanges {

    constructor(private componentDetailService: ComponentDetailsService) {}
    
ngOnChanges(changes: SimpleChanges): void {
  if (this.config) {
    this.config.forEach((item: any) => {
      item.activeCodeType = item.codeSnippet?.html
        ? 'html'
        : item.codeSnippet?.ts
        ? 'ts'
        : 'command';
    });
  }
}


@Input() config: any = [];

setActiveCodeType(item: any, type: string) {
  item.activeCodeType = type;
}

copyCode(data: string) {
  this.componentDetailService.copyData(data, 'Code copied to clipboard!');
  }
}
