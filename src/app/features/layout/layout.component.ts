import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private session: StorageService) {
    if(!session.get('route')) {
      session.set('route','getting started')
     }
   }

}
