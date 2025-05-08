import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  selectedComponent: string | null = null;
  componentDetails: { codeSnippet: string; description: string } | null = null;

  constructor(private route: Router, private storageService: StorageService) { }


  ngOnInit(): void {
    this.selectedComponent = this.storageService.get('route');

    if (this.selectedComponent)
      this.route.navigate([this.selectedComponent]);
  }

  onComponentSelected(component: string) {
    this.storageService.set('route', component.toLowerCase())
    this.route.navigate([component.toLowerCase()]);
  }
}
