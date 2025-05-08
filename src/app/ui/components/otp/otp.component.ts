import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dt-otp',
  imports: [CommonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpComponent {
  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() control?: FormControl;
  @Input() length = 4;
  @Input() type: 'numeric' | 'alphanumeric' = 'numeric';
  @Input() hyphen = false;
  @Input() autofocus = false;
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otpArray: number[] = [];
  otpValues: string[] = [];
  validationMessage: string = '';

  ngOnInit() {
    this.initializeOtpValues();
    if (this.value && !this.control) {
      this.patchOtpValues(this.value);
      setTimeout(() => this.updateInputFields(), 0);
    }
  }

  ngAfterViewInit() {
    if (this.control && !this.value) {
      this.patchOtpValues(this.control.value);
      this.updateInputFields();
    }
    if (this.autofocus)
      setTimeout(() => this.otpInputs.first?.nativeElement.focus(), 100);
  }

  initializeOtpValues() {
    this.otpArray = Array(this.length).fill(0);
    this.otpValues = Array(this.length).fill('');
  }

  patchOtpValues(value: string) {
    const newValue = this.hyphen ? value.replace(/-/g, '') : value;
    newValue.split('').forEach((char, i) => {
      if (i < this.length) {
        this.otpValues[i] = char;
      }
    });
  }

  updateInputFields() {
    this.otpInputs.forEach((input, index) => {
      input.nativeElement.value = this.otpValues[index];
    });
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.otpValues[index] = input.value;
    this.updateControlValue();

    if (input.value && index < this.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  handlePaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    let pasteData = event.clipboardData?.getData('text') ?? '';
    if (this.hyphen) {
      pasteData = pasteData.replace(/-/g, '');
    }

    if (!this.isValidPasteData(pasteData)) {
      return;
    }

    const pasteValues = pasteData.split('');
    pasteValues.forEach((value, i) => {
      if (index + i < this.length) {
        this.otpValues[index + i] = value;
      }
    });
    this.updateControlValue();
    this.updateInputFields();
    this.otpInputs
      .get(Math.min(index + pasteData.length, this.otpInputs.length - 1))
      ?.nativeElement.focus();
  }

  isValidPasteData(data: string): boolean {
    if (this.type === 'numeric') {
      return /^\d+$/.test(data);
    }
    if (this.type === 'alphanumeric') {
      return /^[a-zA-Z0-9]+$/.test(data);
    }
    return false;
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otpValues[index] && index > 0) {
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      }
      this.otpValues[index] = '';
      this.updateControlValue();
    }
  }

  restrictToNumbers(event: KeyboardEvent): void {
    const regex = this.type === 'numeric' ? /^[0-9]$/ : /^[a-zA-Z0-9]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  updateControlValue() {
    const rawValue = this.otpValues.join('');
    let formattedValue = rawValue;
    if (this.hyphen && rawValue.length === this.length) {
      const mid = rawValue.length / 2;
      formattedValue = [rawValue.slice(0, mid), rawValue.slice(mid)].join('-');
    }
    if (this.control) {
      this.control.setValue(formattedValue);
    }

    this.value = formattedValue;
    this.valueChange.emit(formattedValue);
  }
}
