import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
    dateFormat: 'full' | 'short' | 'medium' | 'iso' | 'numeric' = 'short';
}