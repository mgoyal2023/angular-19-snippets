import { Component } from '@angular/core';
import { ThemeSelectorComponent } from '../../../../ui/components/theme-selector/theme-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
