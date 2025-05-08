import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'dt-error-message',
  imports: [CommonModule, MatFormFieldModule],
  template: `
    <mat-error *ngIf="(formControl().touched || markAsTouched) && errorKeys.length && formControl().errors?.[errorKeys[0]]"
          class="dt-error-message" 
          [ngStyle]="cssStyle"> 
      {{ _validations[errorKeys[0]] }}
    </mat-error>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DtErrorMessage {
  @Input()
  set control(control: AbstractControl) {
    this.formControl = signal(control);
  }

  @Input({ required: true })
  set validations(value: { [key: string]: string }) {
    this._validations = value;
    this._updateErrorKeys();
  }

  @Input() markAsTouched: boolean = false;
  @Input() cssStyle!: { [klass: string]: string | number };

  formControl!: Signal<AbstractControl>;
  _validations!: { [key: string]: string };
  errorKeys: string[] = [];
  
  private _updateErrorKeys(): void {
    this.errorKeys = this._validations && typeof(this._validations) === 'object'
      ? Object.keys(this._validations)
      : [];
  }
}
