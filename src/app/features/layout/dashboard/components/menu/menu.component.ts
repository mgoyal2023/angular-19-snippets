import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../../../core/services/storage.service';

export interface menuList {
  name: string;
  subMenu: string[] | null;
}
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() componentSelected = new EventEmitter<string>();

  menuList: menuList[] = [
    { name: 'Getting Started', subMenu: null },
    { name: 'Gridster', subMenu: ['Gridster'] },
    {
      name: 'Material Components',
      subMenu: ['Datepicker', 'Radio', 'Dropdown', 'Checkbox', 'OTP', 'File', 'Mat Chips', 'Timer', 'Number', 'Text']
    },
    {
      name: 'Core Components',
      subMenu: ['Timepicker', 'Error', 'Phone Number']
    },
    { name: 'PrimeNG Components', subMenu: null }
  ];

  selectedComponent: string = '';
  openMenus: Set<string> = new Set(); // Track open menus

  constructor(private session: StorageService) { }

  ngOnInit(): void {
    const route: any = this.session.get('route');
    this.selectedComponent = route ? route : 'getting started';
    this.toggleSubMenu(this._getParentMenu(this.selectedComponent));
  }

  private _getParentMenu(selectedComponent: string): string {
    const menu = this.menuList.find(menu =>
      menu.subMenu?.some(sub =>
        sub.toLowerCase() === selectedComponent.toLowerCase()
      )
    );
    
    return menu ? menu.name : '';
  }

  toggleSubMenu(menuName: string): void {

    if (this.openMenus.has(menuName)) {
      this.openMenus.delete(menuName); // Close the menu if it's already open
    } else {
      this.openMenus.add(menuName); // Open the menu
    }
  }

  onSelectMenu(item: menuList) {
    if (item.subMenu)
      return;
    
    this.selectedComponent = item.name;
    this.componentSelected.emit(item.name);
  }

  selectComponent(component: string, event: any): void {

    if(event)
      event.stopPropagation(); // Prevent event bubbling

    this.selectedComponent = component;
    this.componentSelected.emit(component);
  }
}
