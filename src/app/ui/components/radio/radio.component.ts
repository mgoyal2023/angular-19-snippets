import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'dt-radio',
  imports: [MatFormFieldModule, MatRadioModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  @Output() valueChange = new EventEmitter<string>();

  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() control?: FormControl;
  @Input() label!: string;
  @Input() options: RadioButtonOption[] = [];
  @Input() value = '';
  @Input() keyExpr = 'key';
  @Input() valueExpr = 'value';
  ngOnChanges(): void {
    console.log(this.options);
    
  }

  onChange(event: MatRadioChange): void {
    const value = event.value;
    if (this.control) {
      this.control.setValue(value);
    } else {
      this.value = value;
    }
    this.valueChange.emit(value);
  }
}

export interface RadioButtonOption {
  [key: string]: any, disabled?: boolean
}
