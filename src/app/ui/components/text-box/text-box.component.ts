import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DtErrorMessage } from '../error-message/error-message.component';

@Component({
  selector: 'dt-text-box',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    DtErrorMessage,
  ],
  template: `
    <mat-form-field class="dt-form-field-container" [ngStyle]="cssStyle">
      <mat-label class="dt-form-label"
        >{{ label }}@if(required){<sup>*</sup>}</mat-label>
      <input
        class="dt-form-field"
        matInput
        [formControl]="control"
        placeholder="{{ placeholder }}"
        [readonly]="readonly"
      />
      <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
    </mat-form-field>
    @if(control && validations){
    <dt-error-message
      [control]="control"
      [validations]="validations"
      [markAsTouched]="markAsTouched"
      [cssStyle]="cssStyle"
    >
    </dt-error-message>
    }
  `,
})
export class TextBoxComponent {
  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() required = false;
  @Input() placeholder: string = '';
  @Input() readonly = false;
  @Input() validations?: { [key: string]: string };
  @Input() markAsTouched: boolean = false;

  @ContentChild('iconTemplate') iconTemplate: any;
}
