import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentDetailsService } from '../../../../../core/services/componentDetails.service';
import { platformService } from '../../../../../core/services/platfombrowser.service';
import { ApiTabComponent } from './components/api-tab/api-tab.component';
import { ComponentDocsComponent } from './components/component-docs/component-docs.component';

@Component({
  selector: 'app-component-details',
  standalone: true,
  imports: [CommonModule, ComponentDocsComponent, ApiTabComponent],
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss'],
})
export class ComponentDetailsComponent {
  @Input() component: string | null = null;
  data: any = {};
  componentData: Record<
    'Component A' | 'Component B' | 'Component C' | string,
    { description: string; tabView: boolean; exampleComponent: Object[] | null; api: Object[] | null }
  > = {};

  @Input() componentDetails: { description: string; tabView: boolean, api: object[] | null | undefined } | null = null;

  tabs: string[] = ['OVERVIEW', 'API'];
  activeTab: string = this.tabs[0];


  constructor(private platform: platformService, private route: ActivatedRoute, private componentservice: ComponentDetailsService) {
    this.data = this.componentservice.componentDetails;
    this.componentData = {
      'getting started': this.data['getting started'],
      timepicker: this.data.timepicker,
      datepicker: this.data.datepicker,
      radio: this.data.radio,
      dropdown: this.data.dropdown,
      checkbox: this.data.checkbox,
      otp: this.data.otp,
      file: this.data.file,
      'mat chips': this.data['mat chips'],
      timer: this.data.timer,
      gridster:this.data.gridster,
      number:this.data.number,
      text:this.data.text,
      error:this.data.error,
      'phone number':this.data['phone number'],
    }; 
    this.route.url.subscribe((urlSegments) => {
      this.component = urlSegments.map((segment) => segment.path).join('/');
      this.componentDetails = this.componentData[this.component] || null;
      this.activeTab = this.tabs[0];
      this._autoScrollToTop();
    });
  }
  private _autoScrollToTop() {
    if(this.platform.isPlatformBrowser) {
      const scrollableInsideOutlet: any = Array.from(document.querySelectorAll('*'))
        .find(el => el.scrollHeight > el.clientHeight);
  
      if (scrollableInsideOutlet)
        scrollableInsideOutlet.scrollTop = 0;
    } 
    }
}
