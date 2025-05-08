import { Component, ContentChild, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dt-number-box',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './number-box.component.html',
})
export class NumberBoxComponent {
  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() control!: FormControl;
  @Input() required = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() readonly = false;

  @ContentChild('iconTemplate') iconTemplate: any;

  restrictToNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
