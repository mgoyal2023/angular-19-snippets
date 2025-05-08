import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dt-mat-chips',
  standalone: true,
  imports: [
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './mat-chips.component.html',
  styleUrl: './mat-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatChipsComponent implements OnInit, OnChanges {
  @Input() label = 'Chips';
  @Input() placeholder = 'Add a chip';
  @Input() options: string[] = [];
  @Input() control?: FormControl;
  @Input() chips: string[] = [];
  @Output() chipsChange = new EventEmitter<string[]>();
  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredOptions: string[] = [];
  manuallySelected = false;

  ngOnInit() {
    this.initializeChips();
    this.resetFilter();
  }

  ngOnChanges() {
    if (this.chips && !this.control) {
      this.chips = [...this.chips];
      this.resetFilter();
    }
  }

  private initializeChips() {
    this.chips = this.control?.value ?? this.chips ?? [];
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value && !this.chips.includes(value)) {
      this.chips.push(value);
      this.updateChips();
    }
    event.chipInput.clear();
    this.resetFilter();
  }

  onRemove(index: number) {
    const removedChip = this.chips[index];
    this.chips.splice(index, 1);
    this.updateChips();

    if (!this.options.includes(removedChip)) {
      this.options.push(removedChip);
    }

    this.resetFilter();
  }

  onFilterOptions(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredOptions = this.options.filter(
      (option) =>
        option.toLowerCase().includes(filterValue) &&
        !this.chips.includes(option)
    );
  }

  resetFilter() {
    this.filteredOptions = this.options.filter(
      (option) => !this.chips.includes(option)
    );
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.viewValue;
    if (!this.chips.includes(value)) {
      this.chips.push(value);
      this.updateChips();
      this.resetFilter();
    }

    this.options = this.options.filter((option) => option !== value);
    this.filteredOptions = this.filteredOptions.filter(
      (option) => option !== value
    );

    event.option.deselect();
    this.manuallySelected = true;

    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.blur();
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 100);
  }

  onAddFirstFilteredOption(event: any) {
    if (this.filteredOptions.length > 0 && !this.manuallySelected) {
      event.preventDefault();
      const firstOption = this.filteredOptions[0];
      if (!this.chips.includes(firstOption)) {
        this.chips.push(firstOption);
        this.updateChips();
      }

      this.options = this.options.filter((option) => option !== firstOption);
      this.filteredOptions = this.filteredOptions.filter(
        (option) => option !== firstOption
      );
      this.resetFilter();

      setTimeout(() => {
        this.manuallySelected = false;
        this.inputElement.nativeElement.blur();
        setTimeout(() => this.inputElement.nativeElement.focus(), 100);
      }, 100);
    }
  }

  updateChips() {
    if (this.control) {
      this.control.setValue([...this.chips]);
    } else {
      this.chips = [...this.chips];
    }
    this.chipsChange.emit([...this.chips]);
  }

  onHandleKeyDown(event: any, inputElement: HTMLInputElement) {
    if (event.key === 'Backspace' && inputElement.value === '') {
      event.preventDefault();
      if (this.chips.length > 0) {
        this.onRemove(this.chips.length - 1);
        inputElement.focus();
      }
    }
  }
}
