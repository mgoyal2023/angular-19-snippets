import { Component, EventEmitter, Inject, Input, OnChanges, Optional, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';
import { DateFormatService } from './dateformat.service';


export interface valueModel {
  start?: Date | null;
  end?: Date | null;
  date?: Date | null;
}

export class CustomDateAdapter extends NativeDateAdapter {
  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) private matDateLocale: string,
    @Inject(DateFormatService) private dateFormatService: DateFormatService
  ) {
    super();
  }

  override format(date: Date, displayFormat: Object): string {
    if (!date) return '';

    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];

    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    const customFormat = this.dateFormatService.dateFormat;

    const dayName = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const monthNumber = (date.getMonth() + 1).toString().padStart(2, '0');
    const monthName = months[date.getMonth()];

    switch (customFormat) {
      case 'full': // e.g., "Sunday, March 27, 2025"
        return `${dayName}, ${monthName} ${dayOfMonth}, ${year}`;
      case 'short': // e.g., "Sunday 27, 2025"
        return `${dayName} ${dayOfMonth}, ${year}`;
      case 'medium': // e.g., "Mar 27, 2025"
        return `${monthName.substring(0, 3)} ${dayOfMonth}, ${year}`;
      case 'iso': // e.g., "2025-03-27"
        return `${year}-${monthNumber}-${dayOfMonth}`;
      case 'numeric': // e.g., "03/27/2025"
        return `${monthNumber}/${dayOfMonth}/${year}`;
      default: // Fallback to numeric format
        return `${monthNumber}/${dayOfMonth}/${year}`;
    }
  }
}

// Custom date format configuration
export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/dd/yyyy',
  },
  display: {
    dateInput: 'MM/dd/yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'dt-datepicker',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDateRangeInput, MatDateRangePicker, ReactiveFormsModule, MatButtonModule, MatNativeDateModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'custom-locale' },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, DateFormatService]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_DATE_FORMATS
    },
    // DateFormatService
  ]
})
export class DatepickerComponent implements OnChanges {

  @Input() value: valueModel = { start: null, end: null, date: null }; // Initial value for the time picker
  @Output() valueChange = new EventEmitter<object | null>(); // Event emitter for value changes
  @Input() dateFormat: 'full' | 'short' | 'medium' | 'iso' | 'numeric' = 'numeric';
  @Input() dateRange: boolean = false;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() overlayDisabled: boolean = false;
  @Input() onlyInputDisabled: boolean = false;
  @Input() control!: FormControl;
  @Input() startControl!: FormControl;
  @Input() endControl!: FormControl;
  @Input() showActionButtons: boolean = false;
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() startAt: Date | null = null;
  @Input() startDatePlaceholder: string = 'Start date';
  @Input() endDatePlaceholder: string = 'End date';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() showHint: boolean = true;

  @Output() dateChange = new EventEmitter<Date | null>();
  @Output() dateInput = new EventEmitter<Date | null>();
  @Output() dateSelected = new EventEmitter<Date | null>();
  @Output() dateNavigationChange = new EventEmitter<Date>();
  @Output() yearSelected = new EventEmitter<Date>();
  @Output() monthSelected = new EventEmitter<Date>();

  // Events for date range picker
  @Output() rangeChange = new EventEmitter<{ start: Date | null, end: Date | null }>();
  @Output() rangeInput = new EventEmitter<{ start: Date | null, end: Date | null }>();
  @Output() startDateChange = new EventEmitter<Date | null>();
  @Output() onDateChanged = new EventEmitter<Date | null>();
  @Output() startDateInput = new EventEmitter<Date | null>();
  @Output() endDateSelected = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date | null>();
  @Output() endDateInput = new EventEmitter<Date | null>();

  // General events
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() invalidInput = new EventEmitter<void>();
  @Output() onBlur = new EventEmitter<void>();
  formattedDate: string = '';

  constructor(private dateAdapter: DateAdapter<Date>, private dateFormatService: DateFormatService) {
    this._intializeForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dateFormatService.dateFormat = this.dateFormat;
  }

  private _intializeForm() {
    if (this.dateRange) {
      if (this.disabled) {
        this.startControl.disable();
        this.endControl.disable();
      }
    } else {
      if (this.disabled) {
        this.control.disable();
      }
    }
  }

  onSingleDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.dateChange.emit(event.value);
  }

  onSingleDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.dateInput.emit(event.value);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this._emitModelValue(event.value, 'date');
    this.onDateChanged.emit(event.value);
  }

  // Event handlers for date range picker
  onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this._emitModelValue(event.value, 'start');
    this.startDateChange.emit(event.value);
    this.emitRangeChange();
  }
  
  
  private _emitModelValue(val: Date | null, type: string): void { 




    this.value = {
      start: this.startControl?.value || (type == 'start' ? val : this.dateRange ? this.value?.start ?? null: null),
      end: this.endControl?.value || (type == 'end' ? val : this.dateRange ? this.value?.end ?? null : null),
      date: this.control?.value || (type == 'date' ? val : !this.dateRange ? this.value?.date ?? null: null)
    };

    this.value =  Object.fromEntries(
      Object.entries(this.value).filter(([key, value]) => value !== null)
    );

    this.valueChange.emit(this.value);
  }

  onStartDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.startDateInput.emit(event.value);
    this.emitRangeInput();
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this._emitModelValue(event.value, 'end');
    this.endDateChange.emit(event.value);
    this.emitRangeChange();
  }

  onEndDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.endDateInput.emit(event.value);
    this.emitRangeInput();
  }

  // Picker event handlers
  onCalendarOpened(): void {
    this.opened.emit();
  }

  onCalendarClosed(): void {
    this.closed.emit();
  }

  onDateSelected(event: MatDatepickerInputEvent<Date, any>): void {
    this.dateSelected.emit(event.value);
  }


  onEndDateSelected(date: Date): void {
    this.endDateSelected.emit(date);
  }

  onYearSelected(normalizedYear: Date): void {
    this.yearSelected.emit(normalizedYear);
  }

  onMonthSelected(normalizedMonth: Date): void {
    this.monthSelected.emit(normalizedMonth);
  }

  onDateNavigationChange(date: Date): void {
    this.dateNavigationChange.emit(date);
  }

  onTouched() {
    this.onBlur.emit()
  }

  private emitRangeChange(): void {
    const range = {
      start: this.startControl?.value || this.value?.start,
      end: this.endControl?.value || this.value?.end
    };
    this.rangeChange.emit(range);
  }

  private emitRangeInput(): void {
    const range = {
      start: this.startControl?.value || this.value?.start,
      end: this.endControl?.value || this.value?.end
    };
    this.rangeInput.emit(range);
  }

  getHintText(): string {
    switch (this.dateFormat) {
      case 'full':
        return 'Day, Month DD, YYYY'; // e.g., Sunday, March 27, 2025
      case 'short':
        return 'Day DD, YYYY'; // e.g., Sunday 27, 2025
      case 'medium':
        return 'Month DD, YYYY'; // e.g., Mar 27, 2025
      case 'iso':
        return 'YYYY-MM-DD'; // e.g., 2025-03-27
      case 'numeric':
      default:
        return 'MM/DD/YYYY'; // e.g., 03/27/2025
    }
  }
}

