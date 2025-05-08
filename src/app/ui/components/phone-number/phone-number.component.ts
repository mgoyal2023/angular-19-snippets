import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import examples from 'libphonenumber-js/examples.mobile.json';
import {
  AsYouType,
  CountryCode,
  getCountries,
  getExampleNumber,
} from 'libphonenumber-js/max';
import { countries } from '../../../core/utils/countries';

@Component({
  selector: 'dt-phone-number',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.scss',
})
export class PhoneNumberComponent implements OnInit {
  @Input() control?: FormControl;
  @Input() countryName!: string;
  @Input() showFlag = true;
  @Input() placeholder = 'Enter phone number';
  @Input() value: any = '';
  @Output() valueChange = new EventEmitter<any>();

  validationMessage: string | null = null;
  countries = countries;
  selectedCountry = this.countries[0];
  phoneNumber = '';
  dropdownOpen = false;
  searchText = '';
  maxLength = 15;

  ngOnInit() {
    const selected = this.countryName
      ? this.countries.find(
          (c) => c.name.toLowerCase() === this.countryName.toLowerCase()
        )
      : null;
    this.selectedCountry = selected || this.countries[0];

    const initialValue = this.control?.value || this.value || '';
    this.phoneNumber =
      typeof initialValue === 'string'
        ? initialValue
        : initialValue?.nationalNumber ?? '';

    this.updateMaxLength();
    this.formatPhoneNumber();
  }

  onToggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSelectCountry(country: any) {
    this.selectedCountry = country;
    this.updateMaxLength();
    this.dropdownOpen = false;
    this.formatPhoneNumber();
  }

  private isValidCountryCode(code: string): code is CountryCode {
    return getCountries().includes(code as CountryCode);
  }

  private updateMaxLength() {
    if (this.isValidCountryCode(this.selectedCountry.code)) {
      const example = getExampleNumber(
        this.selectedCountry.code as CountryCode,
        examples
      );

      if (example) {
        const national = example.formatNational();
        const digitsOnly = national.replace(/\D/g, '');
        this.maxLength = digitsOnly.length;
      } else {
        this.maxLength = 15;
      }
    } else {
      this.maxLength = 15;
    }
    this.phoneNumber = this.phoneNumber.substring(0, this.maxLength);
  }

  onPhoneInput(event: any) {
    let inputValue = event.target.value ?? '';
    let rawInput = inputValue.replace(/\D/g, '').substring(0, this.maxLength);

    const example = getExampleNumber(
      this.selectedCountry.code as CountryCode,
      examples
    );
    const exampleNational = example?.formatNational().replace(/\D/g, '') ?? '';
    const exampleStartsWithZero = exampleNational.startsWith('0');
    if (exampleStartsWithZero && !rawInput.startsWith('0')) {
      rawInput = '0' + rawInput;
    }

    const formatter = new AsYouType(this.selectedCountry.code as CountryCode);
    let formatted = formatter.input(rawInput);
    formatted = this.cleanFormattedOutput(formatted);

    this.phoneNumber = formatted;
    event.target.value = formatted;

    this.emitAndValidate(
      rawInput,
      formatted,
      formatter.getNumber()?.formatInternational() ?? ''
    );
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let text = event.clipboardData?.getData('text') ?? '';
    let raw = text.replace(/\D/g, '').substring(0, this.maxLength);

    const example = getExampleNumber(
      this.selectedCountry.code as CountryCode,
      examples
    );
    const exampleNational = example?.formatNational().replace(/\D/g, '') ?? '';
    const exampleStartsWithZero = exampleNational.startsWith('0');
    if (exampleStartsWithZero && !raw.startsWith('0')) {
      raw = '0' + raw;
    }

    const formatter = new AsYouType(this.selectedCountry.code as CountryCode);
    let formatted = formatter.input(raw);
    formatted = this.cleanFormattedOutput(formatted);

    this.phoneNumber = formatted;
    (event.target as HTMLInputElement).value = formatted;

    this.emitAndValidate(
      raw,
      formatted,
      formatter.getNumber()?.formatInternational() ?? ''
    );
  }

  formatPhoneNumber() {
    const raw = this.phoneNumber
      .replace(/\D/g, '')
      .substring(0, this.maxLength);
    const formatter = new AsYouType(this.selectedCountry.code as CountryCode);
    let formatted = formatter.input(raw);
    formatted = this.cleanFormattedOutput(formatted);
    this.phoneNumber = formatted;

    this.emitAndValidate(
      raw,
      formatted,
      formatter.getNumber()?.formatInternational() ?? ''
    );
  }

  filteredCountries() {
    return this.countries.filter((country: any) =>
      country.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  private cleanFormattedOutput(formatted: string): string {
    return formatted.replace(/\(\)/g, '').replace(/\($/, '').replace(/\)$/, '');
  }

  private emitAndValidate(
    raw: string,
    national: string,
    international: string
  ) {
    const formatter = new AsYouType(this.selectedCountry.code as CountryCode);
    formatter.input(raw);
    const parsed = formatter.getNumber();
    const isValid = parsed?.isValid() ?? false;

    if (this.control && national) {
      this.control.setErrors(isValid ? null : { invalidPhoneNumber: true });
    }

    const numberType = parsed ? parsed.getType() : null;
    let phoneTypeMessage = '';
    if (numberType === 'MOBILE') {
      phoneTypeMessage = 'Mobile number';
    } else if (numberType === 'FIXED_LINE') {
      phoneTypeMessage = 'Fixed-line number';
    }

    this.validationMessage =
      national && !isValid
        ? `Invalid phone number for ${this.selectedCountry.name}. ${phoneTypeMessage}`
        : phoneTypeMessage;

    const phoneData = {
      countryName: this.selectedCountry.name,
      countryCode: this.selectedCountry.dialCode,
      number: raw,
      nationalNumber: national,
      internationalNumber: international,
    };

    if (this.control) {
      this.control.setValue(phoneData, { emitEvent: false });
    } else {
      this.value = phoneData;
    }

    this.valueChange.emit(phoneData);
  }
}
