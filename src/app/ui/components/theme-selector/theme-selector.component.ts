import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemeService, ThemeColor } from '../../../core/services/theme.service';

@Component({
    selector: 'app-theme-selector',
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatFormFieldModule],
    template: `
    <mat-form-field appearance="fill">
      <mat-label>Theme</mat-label>
      <mat-select [value]="currentTheme?.name" (selectionChange)="onThemeChange($event)">
        <mat-option *ngFor="let theme of themes" [value]="theme.name">
          <div class="theme-option">
            <span class="color-preview" [style.background-color]="theme.primary"></span>
            {{ theme.name }}
          </div>
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
    styles: [`
    :host {
      display: block;
    }
    
    mat-form-field {
      width: 120px;
      height: 70px;
      position: relative;
      top: 10px;
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-preview {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ThemeSelectorComponent implements OnInit {
    themes: ThemeColor[] = [];
    currentTheme?: ThemeColor;

    constructor(private themeService: ThemeService) { }

    ngOnInit() {
        this.themes = this.themeService.getThemes();
        this.themeService.currentTheme$.subscribe(theme => {
            this.currentTheme = theme;
        });
    }

    onThemeChange(event: any) {
        const selectedTheme = this.themes.find(theme => theme.name === event.value);
        if (selectedTheme) {
            this.themeService.setTheme(selectedTheme);
        }
    }
} 