import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'dt-dropdown',
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() control?: FormControl;
  @Input() label = 'Select';
  @Input() options: DropdownOption[] = [];
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() keyExpr = 'key';
  @Input() valueExpr = 'value';
  @Input() value?: string | string[];
  @Output() valueChange = new EventEmitter<string | string[]>();

  onSelectionChange(value: string | string[]): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
export interface DropdownOption {
  [key: string]: any, disabled?: boolean
}
