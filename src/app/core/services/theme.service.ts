import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ThemeColor {
  name: string;
  primary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: ThemeColor[] = [
    { name: 'Blue', primary: '#217cb0' },
    { name: 'Purple', primary: '#6b46c1' },
    { name: 'Green', primary: '#2c9f7a' }
  ];

  private currentThemeSubject = new BehaviorSubject<ThemeColor>(this.themes[0]);
  currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    // Initialize from localStorage if exists
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      const theme = this.themes.find(t => t.name === savedTheme);
      if (theme) {
        this.setTheme(theme);
      }
    }
  }

  getThemes(): ThemeColor[] {
    return this.themes;
  }

  setTheme(theme: ThemeColor) {
    this.currentThemeSubject.next(theme);
    localStorage.setItem('appTheme', theme.name);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--primary-color-rgb', this.hexToRgb(theme.primary));
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '33, 124, 176'; // Default fallback
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `${r}, ${g}, ${b}`;
  }
} 