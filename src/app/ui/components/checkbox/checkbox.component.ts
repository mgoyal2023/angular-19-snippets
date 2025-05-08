import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'dt-checkbox',
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() label!: string;
  @Input() control?: FormControl;
  @Input() value = false;
  @Input() disabled? = false;
  @Output() valueChange = new EventEmitter<boolean>();

  onCheckboxChange(value: boolean): void {
    if (this.control) {
      this.control.setValue(value);
    } else {
      this.value = value;
    }
    this.valueChange.emit(value);
  }
}
