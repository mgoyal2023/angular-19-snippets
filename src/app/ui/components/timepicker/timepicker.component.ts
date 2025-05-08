import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TimePickerModel {
  start?: Date | string | null | number; // format: 'HH:mm' (e.g. '09:30')
  end?: Date | string | null | number;   // optional, used only when range is selected
  time?: Date | string | null | number;      // if only one time (no range)
}

@Component({
  selector: 'dt-timepicker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.css'
})
export class TimepickerComponent implements OnInit, AfterViewInit {

  @Input() control!: FormControl;

  @Input() startControl!: FormControl;

  @Input() endControl!: FormControl;

  @Input() initialTime: string = '';

  @Input() range: boolean = false;

  @Input() interval: 15 | 30 | 60 = 15; // Interval in minutes, default to 30 minutes

  @Input() use24HourFormat: boolean = false; // New property to toggle 24-hour format

  @Input() restrictEndTime: boolean = false; // New property to enable/disable end time restriction

  @Input() showTimeGapInEndList: boolean = false; // New property to enable/disable time gap display in end time list

  @Input() value: TimePickerModel = { start: null, end: null, time: null };

  @Output() valueChange = new EventEmitter<TimePickerModel>();

  @Output() overlayOpened = new EventEmitter<void>(); // Event for overlay opening

  @Output() overlayClosed = new EventEmitter<void>(); // Event for overlay closing

  @Output() timeSelected = new EventEmitter<string | { start: string, end: string } | TimePickerModel | null | undefined | Date>(); // Event for time selection

  @Output() onBlur = new EventEmitter<void>(); // Event for blur

  @ViewChild('timePickerContainer') timePickerContainer!: ElementRef;

  // timeForm!: FormGroup;
  timeOptions: string[] = []; // Combined list of time options
  isOpen: boolean = false;
  isEndOpen: boolean = false;
  isStartOpen: boolean = false;
  _value: TimePickerModel | null = null; // Internal value for ngModel
  private documentClickListener: (() => void) | null = null;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this._subscribeToOverlayOpen();
  }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {

    const noControlPassed = this.range
      ? !this.startControl || !this.endControl
      : !this.control;

    if (noControlPassed) {
      this._value = this.manipulateVals(this.value);
      this.generateTimeOptions();
      return;
    }

    // Convert initial values to Date instances if they are timestamps or strings
    if (this.control && (typeof this.control.value === 'number' || typeof this.control.value === 'string')) {
      this.control.setValue(this._convertToDate(this.getClosestTime(this.control.value as number, this.interval)));
    }

    if (this.startControl && (typeof this.startControl.value === 'number' || typeof this.startControl.value === 'string')) {
      this.startControl.setValue(this._convertToDate(this.getClosestTime(this.startControl.value as number, this.interval)));
    }

    if (this.endControl && (typeof this.endControl.value === 'number' || typeof this.endControl.value === 'string')) {
      this.endControl.setValue(this._convertToDate(this.getClosestTime(this.endControl.value as number, this.interval)));
    }

    this.generateTimeOptions();
  }

  private manipulateVals(values: TimePickerModel): TimePickerModel {
    let object: TimePickerModel = {
      start: null,
      end: null,
      time: null
    }

    if (values.start) {
      object.start = this._convertToDate(this.getClosestTime(values.start as Date, this.interval));
    }
    if (values.end) {
      object.end = this._convertToDate(this.getClosestTime(values.end as Date, this.interval));
    }
    if (values.time) {
      object.time = this._convertToDate(this.getClosestTime(values.time as Date, this.interval));
    }

    return object;
  }

  private getClosestTime(time: Date | number, interval: number): number {
    const dateObj = typeof time === 'number' ? new Date(time) : time;
    const mins = dateObj.getHours() * 60 + dateObj.getMinutes();
    const rounded = Math.round(mins / interval) * interval;
    const hours = Math.floor(rounded / 60);
    const minutes = rounded % 60;

    const result = new Date(dateObj);
    result.setHours(hours, minutes, 0, 0);
    return result.getTime(); // return as timestamp
  }


  private _convertToDate(value: string | number): Date {
    if (typeof value === 'number') {
      return new Date(value); // Convert timestamp to Date
    }
    if (typeof value === 'string') {
      return new Date(value); // Convert ISO string or formatted string to Date
    }
    return value as Date; // If already a Date instance, return as is
  }

  private _subscribeToOverlayOpen(): void {
    if (this.isOpen || this.isStartOpen || this.isEndOpen) {
      setTimeout(() => {
        const selectedTime = this.isEndOpen
          ? this.endControl?.value || this._value?.end // this.timeForm.get('endTime')?.value
          : this.isStartOpen
            ? this.startControl?.value || this._value?.start //this.timeForm.get('startTime')?.value
            : this.control?.value || this._value?.time //this.timeForm?.get('time')?.value;

        this.scrollToSelectedOption(selectedTime);
        this.overlayOpened.emit(); // Emit overlay opened event
      });
    }
  }

  private scrollToSelectedOption(selectedTime: string | null): void {
    if (!this.timePickerContainer) return;

    const container = this.timePickerContainer.nativeElement;
    if (!selectedTime) {
      container.scrollTop = 0; // Scroll to the top if no option is selected
      return;
    }

    const selectedElement = Array.from(container.querySelectorAll('li')).find(
      (el) => (el as HTMLElement).classList.contains('selected')
    );

    if (selectedElement) {
      container.scrollTop = (selectedElement as HTMLElement).offsetTop - container.offsetTop;
    }
  }

  generateTimeOptions(): void {
    this.timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute = minute + this.interval) {
        const formattedHour = this.use24HourFormat
          ? hour.toString().padStart(2, '0')
          : ((hour % 12) || 12).toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const period = this.use24HourFormat ? '' : hour < 12 ? ' AM' : ' PM';
        this.timeOptions.push(`${formattedHour}:${formattedMinute}${period}`);
      }
    }
  }

  onGetFilteredTimeOptions(): string[] {
    const startTime = this._value?.start as Date || this.startControl?.value as Date;

    // If showTimeGapInEndList is true, generate options with time gaps
    if (this.showTimeGapInEndList) {
      const filteredOptions: string[] = [];
      let gapMinutes = 0;

      for (const option of this.timeOptions) {
        const optionDate = this._getDateWithTime(option);

        if (!startTime || (optionDate < startTime)) {
          // If restrictEndTime is true, skip options earlier than or equal to the selected start time

          continue;
        } else {
          // Include options after the selected start time with time gap
          let gapLabel: string;
          if (gapMinutes < 60) {
            gapLabel = `${gapMinutes} Minutes`; // Display in minutes if less than an hour
          } else {
            const gapInHours = (gapMinutes / 60).toFixed(1); // Convert minutes to hours and format to 1 decimal place
            gapLabel = `${gapInHours} Hours`; // Display in hours if 1 hour or more
          }

          filteredOptions.push(`${option} (${gapLabel})`);
          gapMinutes += this.interval; // Increment the gap for the next option 
        }
      }

      return filteredOptions;
    }

    // Default behavior: Return all options if restrictEndTime is false
    if (!this.restrictEndTime) {
      return this.timeOptions;
    }

    // Filter options to exclude times earlier than the selected start time
    if (startTime) {
      return this.timeOptions.filter((option) => {
        const optionDate = this._getDateWithTime(option);
        return optionDate >= startTime; // Only include times later than the selected start time
      });
    }

    return this.timeOptions; // Return all options if no start time is selected
  }

  onGetSelectedTime(selected: string): boolean {
    const dateInstance = this.isStartOpen
      ? this.startControl?.value || this._value?.start
      : this.isEndOpen
        ? this.endControl?.value || this._value?.end
        : this.control?.value || this._value?.time;

    if (dateInstance instanceof Date) {
      const hours = this.use24HourFormat
        ? dateInstance.getHours().toString().padStart(2, '0')
        : ((dateInstance.getHours() % 12) || 12).toString().padStart(2, '0');
      const minutes = dateInstance.getMinutes().toString().padStart(2, '0');
      const period = this.use24HourFormat ? '' : dateInstance.getHours() < 12 ? ' AM' : ' PM';
      return selected.split('(')[0].trim() === `${hours}:${minutes}${period}`;
    }

    return false;
  }

  onToggleTimePicker(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this._subscribeToOverlayOpen();
    } else {
      this.overlayClosed.emit(); // Emit overlay closed event
    }
    this.handleDocumentClickListener();
  }

  onToggleEndTimePickerEnd(): void {
    this.isStartOpen = this.isStartOpen ? !this.isStartOpen : this.isStartOpen;
    this.isEndOpen = !this.isEndOpen;
    if (this.isEndOpen) {
      this._subscribeToOverlayOpen();
    } else {
      this.overlayClosed.emit(); // Emit overlay closed event
    }
    this.handleDocumentClickListener();
  }

  onToggleTimePickerStart(): void {
    this.isStartOpen = !this.isStartOpen;
    this.isEndOpen = this.isEndOpen ? !this.isEndOpen : this.isEndOpen;
    if (this.isStartOpen) {
      this._subscribeToOverlayOpen();
    } else {
      this.overlayClosed.emit(); // Emit overlay closed event
    }
    this.handleDocumentClickListener();
  }

  onTimeSelected(time: string, isEndTime: boolean = false): void {
    const selectedDate = this._getDateWithTime(time); // Convert the selected time to a Date instance

    if (this.range && isEndTime) {
      this.endControl
        ? this.endControl.setValue(selectedDate)
        : this._value && (this._value.end = selectedDate); //this.timeForm.patchValue({ endTime: selectedDate });
      // Keep the overlay open for further interaction
    } else if (this.range) {
      if ((this._value?.end || this.endControl?.value) < selectedDate) {
        if (this.endControl) this.endControl.setValue(null);
        else this._value && (this._value.end = null);
      }
      this.startControl
        ? this.startControl.setValue(selectedDate)
        : this._value && (this._value.start = selectedDate);
      // Keep the overlay open for further interaction
    } else {
      this.control
        ? this.control.setValue(selectedDate) // Update the FormControl with the Date instance
        : this._value && (this._value.time = selectedDate);
      // Keep the overlay open for further interaction
    }

    this.timeSelected.emit(
      this.range
        ? this.startControl?.value || this.endControl?.value
          ? { start: this.startControl?.value, end: this.endControl?.value }
          : this._value
        : selectedDate
    ); // Emit the Date instance or range

    this.emitNgModelChange(); // Emit ngModelChange event

    // Do not close the overlay here; allow the user to manually close it
    this.handleDocumentClickListener();
  }

  private emitNgModelChange(): void {

    this.value = {
      start: new Date(this.startControl?.value).getTime() || new Date(this._value?.start as Date).getTime(),
      end: new Date(this.endControl?.value).getTime() || new Date(this._value?.end as Date).getTime(),
      time: new Date(this.control?.value).getTime() || new Date(this._value?.time as Date).getTime()
    };

    let event = this.range ? { start: this.value?.start, end: this.value?.end } : { time: this.value?.time }
    this.valueChange.emit(event);
  }

  private _getDateWithTime(time: string): Date {
    const [hoursMinutes, period] = time.split(' ');
    const [hours, minutes] = hoursMinutes.split(':').map(Number);
    const date = new Date();
    if (this.use24HourFormat) {
      date.setHours(hours);
    } else {
      date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours);
    }
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  onBlurEvent(): void {
    this.onBlur.emit(); // Emit blur event when input loses focus
  }

  private handleDocumentClickListener(): void {
    const isAnyOpen = this.isOpen || this.isEndOpen || this.isStartOpen;

    if (isAnyOpen && !this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
        if (!this.elRef.nativeElement.contains(event.target)) {
          this.isOpen = false;
          this.isEndOpen = false;
          this.isStartOpen = false;
          this.overlayClosed.emit(); // Emit overlay closed event
          this.handleDocumentClickListener();
        }
      });

    } else if (!isAnyOpen && this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
}