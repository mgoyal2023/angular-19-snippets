import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckboxComponent } from '../../ui/components/checkbox/checkbox.component';
import { DatepickerComponent } from '../../ui/components/datepicker/datepicker.component';
import { DropdownComponent } from '../../ui/components/dropdown/dropdown.component';
import { FileComponent } from '../../ui/components/file/file.component';
import { MatChipsComponent } from '../../ui/components/mat-chips/mat-chips.component';
import { NumberBoxComponent } from '../../ui/components/number-box/number-box.component';
import { OtpComponent } from '../../ui/components/otp/otp.component';
import { PhoneNumberComponent } from '../../ui/components/phone-number/phone-number.component';
import { RadioComponent } from '../../ui/components/radio/radio.component';
import { TextBoxComponent } from '../../ui/components/text-box/text-box.component';
import { TimepickerComponent } from '../../ui/components/timepicker/timepicker.component';
import { TimerComponent } from '../../ui/components/timer/timer.component';

@Injectable({
  providedIn: 'root',
})
export class ComponentDetailsService {
  constructor(private snackBar: MatSnackBar) {}
  form = new FormGroup({
    timePicker: new FormControl(new Date().setHours(20, 15, 0, 0)),
    startTimePicker: new FormControl(new Date().setHours(5, 40, 0, 0)),
    endTimePicker: new FormControl(new Date().setHours(6, 5, 0, 0)),
    radio: new FormControl('mango'),
    dropdown: new FormControl(),
    checkbox: new FormControl(false),
    otp: new FormControl(''),
    file: new FormControl(''),
    chips: new FormControl([]),
    datepicker: new FormControl(new Date()),
    startDatepicker: new FormControl(new Date('2025-04-25T00:00:00')),
    endDatepicker: new FormControl(new Date('2025-05-10T00:00:00')),
    numberBox: new FormControl(''),
    textBox: new FormControl('', [
      Validators.required
    ]),
    phone:new FormControl('')
  });
  phoneNumber='';
  textBoxValidations = {
    required: 'This field is required.'
  };
  radioOptions = [
    { name: 'apple', valueData: 'Apple', disabled: true },
    { name: 'banana', valueData: 'Banana' },
    { name: 'grapes', valueData: 'Grapes' },
    { name: 'mango', valueData: 'Mango' },
  ];
  dropdownOptions = [
    { key: 'Option 1', value: 'option1', disabled: true },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
    { key: 'Option 4', value: 'option4' },
  ];
  
  selectedRadioOption = this.radioOptions[1].name;
  dropdownOption = this.dropdownOptions[2].key;
  checkboxValue = true;
  otpValue = '';
  selectedFile: File | null = null;
  chipsOptions = ['Apple', 'Banana', 'Grapes', 'Mango'];
  chips=[]
  chips1 = ['Apple'];

  copyData(data: string, message: string) {
    navigator.clipboard.writeText(data).then(() => {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
    });
  }

  componentDetails = {
    'getting started': {
      description: 'Setting up Ng-dits in an Angular CLI project.',
      tabView: false,
      api: null,
      exampleComponent: [
        {
          description: 'Ng-dits is available for download on the npm registry.',
          codeSnippet: {
            command: `npm install ng-dits-gridster`,
          },
        },
      ],
    },
    timepicker: {
      description:
        'This is Timepicker Component, which demonstrates basic functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the TimepickerComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { TimepickerComponent } from '../../../../../ui/components/timepicker/timepicker.component';`,
          },
          properties: [
            {
              name: 'range',
              type: 'boolean',
              default: 'false',
              description:
                'Indicates whether the time picker is in range mode (start and end time selection).',
            },
            {
              name: 'value',
              type: 'TimePickerModel',
              default: 'null',
              description:
                'The selected time value, which can be a single time or a range of times.',
            },
            {
              name: 'interval',
              type: 'number',
              default: '30',
              description:
                'The interval in minutes for the time options displayed in the dropdown.',
            },
            {
              name: 'use24HourFormat',
              type: 'boolean',
              default: 'false',
              description:
                'Indicates whether to display the time in 24-hour format.',
            },
            {
              name: 'restrictEndTime',
              type: 'boolean',
              default: 'false',
              description:
                'If true, restricts the end time selection based on the start time.',
            },
            {
              name: 'showTimeGapInEndList',
              type: 'boolean',
              default: 'false',
              description:
                'If true, shows the time gap in the end time list when restricting end time.',
            },
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description:
                'Custom CSS styles to apply to the time picker component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the time picker to a reactive form.',
            },
            {
              name: 'startControl',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance for the start time in range mode.',
            },
            {
              name: 'endControl',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance for the end time in range mode.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<TimePickerModel>',
              description:
                'Emits the selected time or time range when it changes.',
            },
            {
              name: 'overlayOpened',
              type: 'EventEmitter<void>',
              description: 'Emits when the time picker overlay is opened.',
            },
            {
              name: 'overlayClosed',
              type: 'EventEmitter<void>',
              description: 'Emits when the time picker overlay is closed.',
            },
            {
              name: 'timeSelected',
              type: 'EventEmitter<string | { start: string, end: string } | TimePickerModel | null | undefined | Date>',
              description: 'Emits the selected time or time range.',
            },
            {
              name: 'onBlur',
              type: 'EventEmitter<void>',
              description: 'Emits when the time picker input loses focus.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: TimepickerComponent,
          inputData: {
            range: true,
            value: { start: 1745317800000, end: 1745328600000 },
            interval: 60,
          },
          description:
            'This is a time picker component that supports time range selection, configurable interval steps (e.g., 60 minutes), and two-way binding via [(value)].',
          codeSnippet: {
            html: `<dt-timepicker [range]="true" [interval]="60" [(value)]="timeRange"></dt-timepicker>`,
            ts: `import { Component } from '@angular/core';
import { TimepickerComponent, TimePickerModel } from '../../../../../ui/components/timepicker/timepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [TimepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  timeRange: TimePickerModel = {
  start: 1745317800000, 
  end: 1745328600000  
  };
}`,
          },
        },
        {
          componentRef: TimepickerComponent,
          inputData: {
            control: this.form.controls.timePicker,
            use24HourFormat: true,
          },
          description:
            'This is a time picker component that supports a 24-hour format and can be reused within a form.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-timepicker [control]="form.controls.timePicker" [use24HourFormat]="true"></dt-timepicker>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
 import { TimepickerComponent, TimePickerModel } from '../../../../../ui/components/timepicker/timepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [TimepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
        
  ngOnInit() {
    this.form = new FormGroup({
    timePicker:new FormControl(new Date().setHours(20, 15, 0, 0))
    });
  }
}`,
          },
        },
        {
          componentRef: TimepickerComponent,
          inputData: {
            startControl: this.form.controls.startTimePicker,
            endControl: this.form.controls.endTimePicker,
            range: true,
            restrictEndTime: true,
            showTimeGapInEndList: true,
          },
          description:
            'This is a time picker component with start and end time controls, supporting range selection, restricting the end time based on the start time, showing the time gap in the end time list, and automatically selecting the nearest available time if the chosen time is not in the available list or interval.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-timepicker [startControl]="form.controls.startTimePicker" [endControl]="form.controls.endTimePicker" [range]="true" [restrictEndTime]="true" [showTimeGapInEndList]="true"></dt-timepicker>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TimepickerComponent, TimePickerModel } from '../../../../../ui/components/timepicker/timepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [TimepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
        
  ngOnInit() {
    this.form = new FormGroup({
    startTimePicker: new FormControl(new Date().setHours(5, 40, 0, 0)),
    endTimePicker: new FormControl(new Date().setHours(6, 5, 0, 0)),
    });
  }
}`,
          },
        },
      ],
    },
    datepicker: {
      description:
        'This is Datepicker Component, which demonstrates basic functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the DatepickerComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';`,
          },
          properties: [
            {
              name: 'value',
              type: 'valueModel',
              default: '{ start: null, end: null, date: null }',
              description: 'Initial value for the date picker.',
            },
            {
              name: 'dateFormat',
              type: `'full' | 'short' | 'medium' | 'iso' | 'numeric'`,
              default: `'numeric'`,
              description: 'Format of the date to display.',
            },
            {
              name: 'dateRange',
              type: 'boolean',
              default: 'false',
              description:
                'Indicates whether the date picker is in range mode.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: 'undefined',
              description: 'Placeholder text for the input field.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables the date picker.',
            },
            {
              name: 'overlayDisabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables the overlay of the date picker.',
            },
            {
              name: 'onlyInputDisabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables only the input field.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'undefined',
              description: 'FormControl instance for single date selection.',
            },
            {
              name: 'startControl',
              type: 'FormControl',
              default: 'undefined',
              description:
                'FormControl instance for the start date in range mode.',
            },
            {
              name: 'endControl',
              type: 'FormControl',
              default: 'undefined',
              description:
                'FormControl instance for the end date in range mode.',
            },
            {
              name: 'showActionButtons',
              type: 'boolean',
              default: 'false',
              description: 'Shows action buttons in the date picker.',
            },
            {
              name: 'startView',
              type: `'month' | 'year' | 'multi-year'`,
              default: `'month'`,
              description: 'Start view of the calendar.',
            },
            {
              name: 'startAt',
              type: 'Date | null',
              default: 'null',
              description: 'Start date for the calendar.',
            },
            {
              name: 'startDatePlaceholder',
              type: 'string',
              default: `'Start date'`,
              description: 'Placeholder for the start date input.',
            },
            {
              name: 'endDatePlaceholder',
              type: 'string',
              default: `'End date'`,
              description: 'Placeholder for the end date input.',
            },
            {
              name: 'appearance',
              type: 'MatFormFieldAppearance',
              default: `'fill'`,
              description: 'Appearance style of the form field.',
            },
            {
              name: 'floatLabel',
              type: 'FloatLabelType',
              default: `'auto'`,
              description: 'Float label behavior.',
            },
            {
              name: 'showHint',
              type: 'boolean',
              default: 'true',
              description: 'Shows hint text for the date format.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<object | null>',
              description: 'Emits when the value changes.',
            },
            {
              name: 'dateChange',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when the date changes.',
            },
            {
              name: 'dateInput',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when a date is input.',
            },
            {
              name: 'dateSelected',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when a date is selected.',
            },
            {
              name: 'dateNavigationChange',
              type: 'EventEmitter<Date>',
              description: 'Emits when the calendar navigation changes.',
            },
            {
              name: 'yearSelected',
              type: 'EventEmitter<Date>',
              description: 'Emits when a year is selected.',
            },
            {
              name: 'monthSelected',
              type: 'EventEmitter<Date>',
              description: 'Emits when a month is selected.',
            },
            {
              name: 'rangeChange',
              type: 'EventEmitter<{ start: Date | null, end: Date | null }>',
              description: 'Emits when the date range changes.',
            },
            {
              name: 'rangeInput',
              type: 'EventEmitter<{ start: Date | null, end: Date | null }>',
              description: 'Emits when a date range is input.',
            },
            {
              name: 'startDateChange',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when the start date changes.',
            },
            {
              name: 'onDateChanged',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when the date is changed.',
            },
            {
              name: 'startDateInput',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when the start date is input.',
            },
            {
              name: 'endDateSelected',
              type: 'EventEmitter<Date>',
              description: 'Emits when the end date is selected.',
            },
            {
              name: 'endDateChange',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when the end date changes.',
            },
            {
              name: 'endDateInput',
              type: 'EventEmitter<Date | null>',
              description: 'Emits when the end date is input.',
            },
            {
              name: 'opened',
              type: 'EventEmitter<void>',
              description: 'Emits when the calendar is opened.',
            },
            {
              name: 'closed',
              type: 'EventEmitter<void>',
              description: 'Emits when the calendar is closed.',
            },
            {
              name: 'invalidInput',
              type: 'EventEmitter<void>',
              description: 'Emits when an invalid input is detected.',
            },
            {
              name: 'onBlur',
              type: 'EventEmitter<void>',
              description: 'Emits when the input loses focus.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: DatepickerComponent,
          inputData: {
            dateFormat: 'iso',
            placeholder: 'Select a date',
          },
          description:
            'This Datepicker component supports ISO date format and allows setting a placeholder for the input field.',
          codeSnippet: {
            html: `<dt-datepicker [dateFormat]="'iso'" [placeholder]="'Select a date'"></dt-datepicker>`,
            ts: `import { Component } from '@angular/core';
import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [DatepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {}`,
          },
        },
        {
          componentRef: DatepickerComponent,
          inputData: {
            dateRange: true,
            startControl: this.form.controls.startDatepicker,
            endControl: this.form.controls.endDatepicker,
            appearance: 'outline',
            showHint: false,
          },
          description:
            'This Datepicker component supports date range selection, integrates with reactive forms, and uses an outlined appearance without hint text.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-datepicker [dateRange]="true" [startControl]="form.controls.startDatepicker" [endControl]="form.controls.endDatepicker" [appearance]="'outline'" [showHint]="false"></dt-datepicker>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [DatepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
        
  ngOnInit() {
    this.form = new FormGroup({
      startDatepicker: new FormControl(new Date('2025-04-25T00:00:00')),
      endDatepicker: new FormControl(new Date('2025-05-10T00:00:00')),
    });
  }
}`,
          },
        },
        {
          componentRef: DatepickerComponent,
          inputData: {
            control: this.form.controls.datepicker,
            showActionButtons: true,
            appearance: 'outline',
          },
          description:
            'This Datepicker component integrates with reactive forms, includes action buttons for user interaction, and uses an outlined appearance.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-datepicker [control]="form.controls.datepicker" [showActionButtons]="true" [appearance]="'outline'"></dt-datepicker>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [DatepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
        
  ngOnInit() {
    this.form = new FormGroup({
      datepicker: new FormControl(new Date()),
    });
  }
}`,
          },
        },
        {
          componentRef: DatepickerComponent,
          inputData: {
            onlyInputDisabled: true,
            startAt: new Date('2020-01-01T00:00:00'),
            floatLabel: 'none',
            showHint: false,
          },
          description:
            'This Datepicker component disables only the input field, starts the calendar at a specific date, hides the floating label, and does not show hint text.',
          codeSnippet: {
            html: `<dt-datepicker [onlyInputDisabled]="true" [startAt]="new Date('2020-01-01T00:00:00')" [floatLabel]="'none'" [showHint]="false"></dt-datepicker>`,
            ts: `import { Component } from '@angular/core';
import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [DatepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {}`,
          },
        },
        {
          componentRef: DatepickerComponent,
          inputData: {
            startView: 'multi-year',
          },
          description:
            'This Datepicker component starts the calendar in multi-year view mode.',
          codeSnippet: {
            html: `<dt-datepicker [startView]="'multi-year'"></dt-datepicker>`,
            ts: `import { Component } from '@angular/core';
import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [DatepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {}`,
          },
        },
        {
          componentRef: DatepickerComponent,
          inputData: {
            overlayDisabled: true,
          },
          description:
            'This Datepicker component disables the overlay, preventing the calendar popup from appearing.',
          codeSnippet: {
            html: `<dt-datepicker [overlayDisabled]="true"></dt-datepicker>`,
            ts: `import { Component } from '@angular/core';
import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [DatepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {}`,
          },
        },
        {
          componentRef: DatepickerComponent,
          inputData: {
            disabled: true,
            control: this.form.controls.datepicker,
            showHint: false,
            dateFormat: 'full',
          },
          description:
            'This Datepicker component is disabled, integrates with reactive forms, uses the full date format, and does not show hint text.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-datepicker [disabled]="true" [control]="form.controls.datepicker" [showHint]="false" [dateFormat]="'full'"></dt-datepicker>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatepickerComponent } from '../../../../../ui/components/datepicker/datepicker.component';
        
@Component({
  selector: 'app-example',
  imports: [DatepickerComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
        
  ngOnInit() {
    this.form = new FormGroup({
      datepicker: new FormControl(new Date()),
    });
  }
}`,
          },
        },
      ],
    },
    radio: {
      description:
        'This is Radio Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the RadioComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { RadioComponent } from '../../../../../ui/components/radio/radio.component';`,
          },
          properties: [
            {
              name: 'options',
              type: 'Array<{ [key: string]: any; disabled?: boolean }>',
              default: '[]',
              description:
                'An array of options for the radio buttons. The keys and values are dynamically mapped using `keyExpr` and `valueExpr`. The `disabled` property is optional and can be used to disable specific options.',
            },
            {
              name: 'label',
              type: 'string',
              default: 'Radio',
              description: 'The label to display for the radio group.',
            },
            {
              name: 'keyExpr',
              type: 'string',
              default: 'key',
              description: 'The key expression to use for the option names.',
            },
            {
              name: 'valueExpr',
              type: 'string',
              default: 'value',
              description: 'The value expression to use for the option values.',
            },
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description: 'Custom CSS styles to apply to the radio component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the radio group to a reactive form.',
            },
            {
              name: 'value',
              type: 'string | number | boolean | null',
              default: 'null',
              description: 'The selected value of the radio group.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<string>',
              description: 'Emits the selected value when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: RadioComponent,
          inputData: {
            control: this.form.controls.radio,
            options: this.radioOptions,
            label: 'Choose an option',
            cssStyle: { width: '100%' },
            keyExpr: 'name',
            valueExpr: 'valueData',
          },
          description:
            'This is a radio component that works with reactive forms and allows you to set the default selected option and disable particular options.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-radio [control]="form.controls.radio" [options]="radioOptions" [keyExpr]="'name'" [valueExpr]="'valueData'" [label]="'Choose an option'" [cssStyle]="{ 'width': '100%' }"></dt-radio>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RadioComponent } from '../../../../../ui/components/radio/radio.component';
          
@Component({
  selector: 'app-example',
  imports: [RadioComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
          
  ngOnInit() {
    this.form = new FormGroup({
      radio: new FormControl('mango'),
    });
    radioOptions = [
      { name: 'apple', valueData: 'Apple', disabled: true },
      { name: 'banana', valueData: 'Banana' },
      { name: 'grapes', valueData: 'Grapes' },
      { name: 'mango', valueData: 'Mango' },
    ];
  }
}`,
          },
        },
        {
          componentRef: RadioComponent,
          inputData: {
            value: this.selectedRadioOption,
            options: this.radioOptions,
            label: 'Radio Options',
            keyExpr: 'name',
            valueExpr: 'valueData',
            cssStyle: { width: '100%' },
          },
          description:
            'This is a Radio component that supports two-way binding via [(value)] and allows you to set the default selected option.',
          codeSnippet: {
            html: `<dt-radio [(value)]="selectedRadioOption" [options]="radioOptions" [keyExpr]="'name'" [valueExpr]="'valueData'" [label]="'Radio Options'" [cssStyle]="{ 'width': '100%' }"></dt-radio>`,
            ts: `import { Component } from '@angular/core';
import { RadioComponent } from '../../../../../ui/components/radio/radio.component';
          
@Component({
  selector: 'app-example',
  imports: [RadioComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  radioOptions = [
    { name: 'apple', valueData: 'Apple' },
    { name: 'banana', valueData: 'Banana' },
    { name: 'grapes', valueData: 'Grapes' },
    { name: 'mango', valueData: 'Mango' },
  ];
  selectedRadioOption: string = this.radioOptions[0].valueData;
}`,
          },
        },
      ],
    },
    dropdown: {
      description:
        'This is dropdown Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the DropdownComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { DropdownComponent } from '../../../../../ui/components/dropdown/dropdown.component';`,
          },
          properties: [
            {
              name: 'options',
              type: 'Array<{ [key: string]: any; disabled?: boolean }>',
              default: '[]',
              description:
                'An array of options for the dropdown. The keys and values are dynamically mapped using `keyExpr` and `valueExpr`. The `disabled` property is optional and can be used to disable specific options.',
            },
            {
              name: 'label',
              type: 'string',
              default: 'Select',
              description: 'The label to display for the dropdown.',
            },
            {
              name: 'multiple',
              type: 'boolean',
              default: 'false',
              description: 'Indicates whether multiple selection is allowed.',
            },
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description:
                'Custom CSS styles to apply to the dropdown component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the dropdown to a reactive form.',
            },
            {
              name: 'value',
              type: 'string | number | boolean | null',
              default: 'null',
              description: 'The selected value of the dropdown.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Indicates whether the dropdown is disabled.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: 'Select an option',
              description:
                'The placeholder text to display when no option is selected.',
            },

            {
              name: 'keyExpr',
              type: 'string',
              default: 'key',
              description: 'The key expression to use for the option keys.',
            },
            {
              name: 'valueExpr',
              type: 'string',
              default: 'value',
              description: 'The value expression to use for the option values.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<string>',
              description: 'Emits the selected value when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: DropdownComponent,
          inputData: {
            control: this.form.controls.dropdown,
            options: this.dropdownOptions,
            cssStyle: { width: '100%' },
          },
          description:
            'This dropdown component integrates with reactive forms, allowing you to set a label and bind options dynamically.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-dropdown [control]="form.controls.dropdown" [options]="dropdownOptions" [label]="'Choose an option'" [cssStyle]="{ 'width': '100%' }"></dt-dropdown>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DropdownComponent } from '../../../../../ui/components/dropdown/dropdown.component';
        
@Component({
  selector: 'app-example',
  imports: [DropdownComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
          
  ngOnInit() {
    this.form = new FormGroup({
    dropdown: new FormControl(),
    });
    dropdownOptions = [
      { key: 'Option 1', value: 'option1' },
      { key: 'Option 2', value: 'option2' },
      { key: 'Option 3', value: 'option3' },
      { key: 'Option 4', value: 'option4' },
    ];
  }
 }`,
          },
        },
        {
          componentRef: DropdownComponent,
          inputData: {
            control: this.form.controls.dropdown,
            options: this.dropdownOptions,
            label: 'Choose an option',
            multiple: true,
            cssStyle: { width: '100%' },
          },
          description:
            'This dropdown component supports multiple selection, integrates with reactive forms, and allows dynamic option binding.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-dropdown [control]="form.controls.dropdown" [multiple]="true" [options]="dropdownOptions" [label]="'Choose an option'" [cssStyle]="{ 'width': '100%' }"></dt-dropdown>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DropdownComponent } from '../../../../../ui/components/dropdown/dropdown.component';
          
@Component({
  selector: 'app-example',
  imports: [DropdownComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
          
   ngOnInit() {
    this.form = new FormGroup({
    dropdown: new FormControl(),
    });
    dropdownOptions = [
      { key: 'Option 1', value: 'option1' },
      { key: 'Option 2', value: 'option2' },
      { key: 'Option 3', value: 'option3' },
      { key: 'Option 4', value: 'option4' },
    ];
  }
}`,
          },
        },
        {
          componentRef: DropdownComponent,
          inputData: {
            value: this.dropdownOption,
            options: this.dropdownOptions,
            label: 'Choose an option',
            cssStyle: { width: '100%' },
          },
          description:
            'This dropdown component supports two-way data binding and allows setting a default value.',
          codeSnippet: {
            html: `<dt-dropdown [(value)]="dropdownOption" [options]="dropdownOptions" [label]="'Choose an option'" [cssStyle]="{ 'width': '100%' }"></dt-dropdown>`,
            ts: `import { Component } from '@angular/core';  
import { DropdownComponent } from '../../../../../ui/components/dropdown/dropdown.component';
          
@Component({
  selector: 'app-example',
  imports: [DropdownComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  dropdownOption: string = this.dropdownOptions[2].key;
        
  dropdownOptions = [
    { key: 'Option 1', value: 'option1', disabled :true },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
    { key: 'Option 4', value: 'option4' },
  ];
}`,
          },
        },
        {
          componentRef: DropdownComponent,
          inputData: {
            value: this.dropdownOption,
            options: this.dropdownOptions,
            disabled: true,
            label: 'Choose an option',
            cssStyle: { width: '100%' },
          },
          description:
            'This dropdown component supports two-way data binding and can be disabled.',
          codeSnippet: {
            html: `<dt-dropdown [(value)]="dropdownOption" [disabled]="true" [options]="dropdownOptions" [label]="'Choose an option'" [cssStyle]="{ 'width': '100%' }"></dt-dropdown>`,
            ts: `import { Component } from '@angular/core';  
import { DropdownComponent } from '../../../../../ui/components/dropdown/dropdown.component';
          
@Component({
  selector: 'app-example',
  imports: [DropdownComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  dropdownOption: string = this.dropdownOptions[2].value;
        
  dropdownOptions = [
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
    { key: 'Option 4', value: 'option4' },
  ];
}`,
          },
        },
      ],
    },
    checkbox: {
      description:
        'This is checkbox Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the CheckboxComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { CheckboxComponent } from '../../../../../ui/components/checkbox/checkbox.component';`,
          },
          properties: [
            {
              name: 'label',
              type: 'string',
              default: 'Checkbox',
              description: 'The label to display for the checkbox.',
            },
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description:
                'Custom CSS styles to apply to the checkbox component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the checkbox to a reactive form.',
            },
            {
              name: 'value',
              type: 'boolean | null',
              default: 'null',
              description: 'The selected value of the checkbox.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Indicates whether the checkbox is disabled.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<boolean>',
              description: 'Emits the selected value when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: CheckboxComponent,
          inputData: {
            control: this.form.controls.checkbox,
            label: 'Accept Terms and Conditions',
            cssStyle: { width: '100%' },
          },
          description:
            'This checkbox component integrates with reactive forms and allows dynamic label binding.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-checkbox [control]="form.controls.checkbox" [label]="'Accept Terms and Conditions'" [cssStyle]="{ 'width': '100%' }"></dt-checkbox>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CheckboxComponent } from '../../../../../ui/components/checkbox/checkbox.component';
          
@Component({
  selector: 'app-example',
  imports: [CheckboxComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
          
  ngOnInit() {
    this.form = new FormGroup({
    checkbox: new FormControl(false),
    });
  }
}`,
          },
        },
        {
          componentRef: CheckboxComponent,
          inputData: {
            value: this.checkboxValue,
            label: 'Accept Terms and Conditions',
            cssStyle: { width: '100%' },
          },
          description:
            'This checkbox component supports two-way data binding and allows dynamic label binding.',
          codeSnippet: {
            html: `<dt-checkbox [(value)]="checkboxValue" [label]="'Accept Terms and Conditions'" [cssStyle]="{ 'width': '100%' }"></dt-checkbox>`,
            ts: `import { Component } from '@angular/core';
import { CheckboxComponent } from '../../../../../ui/components/checkbox/checkbox.component';
          
@Component({
  selector: 'app-example',
  imports: [CheckboxComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  checkboxValue=true
}`,
          },
        },
      ],
    },
    otp: {
      description:
        'This is otp Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the OTPComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { OtpComponent } from '../../../../../ui/components/otp/otp.component';`,
          },
          properties: [
            {
              name: 'length',
              type: 'number',
              default: '4',
              description: 'The length of the OTP input field.',
            },
            {
              name: 'type',
              type: 'string',
              default: 'numeric',
              description:
                'The type of OTP input (e.g., numeric, alphanumeric).',
            },
            {
              name: 'hyphen',
              type: 'boolean',
              default: 'false',
              description:
                'Indicates whether to allow hyphenation in the OTP input.',
            },
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description: 'Custom CSS styles to apply to the OTP component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the OTP input to a reactive form.',
            },
            {
              name: 'value',
              type: 'string | number | null',
              default: 'null',
              description: 'The selected value of the OTP input.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<string>',
              description: 'Emits the selected value when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: OtpComponent,
          inputData: {
            control: this.form.controls.otp,
            length: 6,
            type: 'alphanumeric',
            hyphen: true,
            autofocus: true,
            cssStyle: { width: '100%' },
          },
          description:
            'This OTP component integrates with reactive forms, supports alphanumeric input, allows hyphenation, autofocus, and provides a customizable length.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-otp [control]="form.controls.otp" [length]="6" [type]="'alphanumeric'" [hyphen]="true" [cssStyle]="{ 'width': '100%' }"></dt-otp>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OtpComponent } from '../../../../../ui/components/otp/otp.component';
          
@Component({
  selector: 'app-example',
  imports: [OtpComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
          
  ngOnInit() {
    this.form = new FormGroup({
    otp: new FormControl(''),
    });
  }
}`,
          },
        },
        {
          componentRef: OtpComponent,
          inputData: {
            value: this.otpValue,
            cssStyle: { width: '100%' },
          },
          description:
            'This OTP component supports two-way data binding and allows customization of its appearance.',
          codeSnippet: {
            html: `<dt-otp [(value)]="otpValue" [cssStyle]="{ 'width': '100%' }"></dt-otp>`,
            ts: `import { Component } from '@angular/core';
import { OtpComponent } from '../../../../../ui/components/otp/otp.component';
          
@Component({
  selector: 'app-example',
  imports: [OtpComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  otpValue=''
}`,
          },
        },
      ],
    },
    file: {
      description:
        'This is file Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the FileComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { FileComponent } from '../../../../../ui/components/file/file.component';`,
          },
          properties: [
            {
              name: 'accept',
              type: 'string',
              default: 'null',
              description:
                'The file types that are accepted for upload (e.g., .jpg, .png).',
            },
            {
              name: 'multiple',
              type: 'boolean',
              default: 'false',
              description:
                'Indicates whether multiple file selection is allowed.',
            },
            {
              name: 'showFileNames',
              type: 'boolean',
              default: 'false',
              description:
                'Indicates whether to display the names of selected files.',
            },
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description: 'Custom CSS styles to apply to the file component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the file input to a reactive form.',
            },
            {
              name: 'value',
              type: 'File | null',
              default: 'null',
              description: 'The selected file value.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<File>',
              description: 'Emits the selected file when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: FileComponent,
          inputData: {
            control: this.form.controls.file,
            label: 'Upload File',
            accept: '.jpg, .png',
            cssStyle: { width: '100%' },
          },
          description:
            'This file component integrates with reactive forms, supports file type restrictions (e.g., .jpg, .png), and allows dynamic label binding.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-file [control]="form.controls.file" [label]="'Upload File'" [accept]="'.jpg, .png'" [cssStyle]="{ 'width': '100%' }"></dt-file>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileComponent } from '../../../../../ui/components/file/file.component';
          
@Component({
  selector: 'app-example',
  imports: [FileComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
          
  ngOnInit() {
    this.form = new FormGroup({
    file: new FormControl(''),
    });
  }
}`,
          },
        },
        {
          componentRef: FileComponent,
          inputData: {
            value: this.selectedFile,
            label: 'Upload File',
            multiple: true,
            showFileNames: true,
            cssStyle: { width: '100%' },
          },
          description:
            'This file component supports two-way data binding, multiple file uploads, and displays the names of selected files.',
          codeSnippet: {
            html: `<dt-file [(value)]="selectedFile" [label]="'Upload File'" [multiple]="true" [showFileNames]="true" [cssStyle]="{ 'width': '100%' }"></dt-file>`,
            ts: `import { Component } from '@angular/core';
import { FileComponent } from '../../../../../ui/components/file/file.component';
          
@Component({
  selector: 'app-example',
  imports: [FileComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent {
  selectedFile: File | null = null;
}`,
          },
        },
      ],
    },
    'mat chips': {
      description:
        'This is Mat-Chips Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the Mat-ChipsComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { MatChipsComponent } from '../../ui/components/mat-chips/mat-chips.component';`,
          },
          properties: [
            {
              name: 'chips',
              type: 'Array<string>',
              default: '[]',
              description: 'An array of selected chips.',
            },
            {
              name: 'options',
              type: 'Array<string>',
              default: '[]',
              description: 'An array of available chip options.',
            },
            {
              name: 'label',
              type: 'string',
              default: 'Chips',
              description: 'The label to display for the chips input.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: 'Add chips',
              description:
                'The placeholder text to display when no chips are selected.',
            },
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description: 'Custom CSS styles to apply to the chips component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the chips input to a reactive form.',
            },
          ],
          outputs: [
            {
              name: 'chipsChange',
              type: 'EventEmitter<string[]>',
              description: 'Emits the selected chips when they change.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: MatChipsComponent,
          inputData: {
            control: this.form.controls.chips,
            options: this.chipsOptions,
            label: 'Select Chips',
            placeholder: 'Add chips',
            cssStyle: { width: '100%' },
          },
          description:
            'This Mat-Chips component integrates with reactive forms, allows dynamic chip selection from predefined options, and provides a customizable label and placeholder.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-mat-chips [control]="form.controls.chips" [label]="'Select Chips'" [placeholder]="'Add chips'" [options]="chipsOptions" [cssStyle]="{ 'width': '100%' }"></dt-mat-chips>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatChipsComponent } from '../../ui/components/mat-chips/mat-chips.component';
          
@Component({
  selector: 'app-example',
  imports: [MatChipsComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
          
  ngOnInit() {
    this.form = new FormGroup({
    chips: new FormControl([]),
    });
  }
}`,
          },
        },
        {
          componentRef: MatChipsComponent,
          inputData: {
            chips: this.chips,
            options: this.chipsOptions,
            label: 'Select Chips',
            placeholder: 'Add chips',
            cssStyle: { width: '100%' },
          },
          description:
            'This Mat-Chips component supports two-way data binding of chips, allows dynamic chip selection from predefined options, and provides a customizable label and placeholder.',
          codeSnippet: {
            html: `<dt-mat-chips [(chips)]="chips" [label]="'Select Chips'" [placeholder]="'Add chips'" [options]="chipsOptions" [cssStyle]="{ 'width': '100%' }"></dt-mat-chips>`,
            ts: `import { Component } from '@angular/core';
import { MatChipsComponent } from '../../ui/components/mat-chips/mat-chips.component';
          
@Component({
  selector: 'app-example',
  imports: [MatChipsComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent {
  chips=[];
  chipsOptions=['Aapple','Banana','Grapes','Mango'];
}`,
          },
        },
        {
          componentRef: MatChipsComponent,
          inputData: {
            chips: this.chips1,
            options: this.chipsOptions,
            label: 'Select Chips',
            placeholder: 'Add chips',
            cssStyle: { width: '100%' },
          },
          description:
            'This Mat-Chips component supports two-way data binding for selected chips, allows dynamic chip selection from predefined options, and provides a customizable label and placeholder.',
          codeSnippet: {
            html: `<dt-mat-chips [(chips)]="chips1" [label]="'Select Chips'" [placeholder]="'Add chips'" [options]="chipsOptions" [cssStyle]="{ 'width': '100%' }"></dt-mat-chips>`,
            ts: `import { Component } from '@angular/core';
import { MatChipsComponent } from '../../ui/components/mat-chips/mat-chips.component';
          
@Component({
  selector: 'app-example',
  imports: [MatChipsComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent {
  chips1 = ['Apple'];
  chipsOptions=['Aapple','Banana','Grapes','Mango'];
}`,
          },
        },
      ],
    },
    timer: {
      description:
        'This is Timer Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the TimerComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { TimerComponent } from '../../ui/components/timer/timer.component';`,
          },
          properties: [
            {
              name: 'duration',
              type: 'number',
              default: '30',
              description: 'The duration of the timer in seconds.',
            },
          ],
          outputs: [
            {
              name: 'timerEnd',
              type: 'EventEmitter<void>',
              description: 'Emits when the timer ends.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          template: true,
          codeSnippet: {
            html: `<dt-timer [duration]="15" >
  <ng-template let-time="remainingTime" let-formatted="formattedTime" let-reset="reset">
    @if (time > 0) {
    Resend OTP in <strong>{{ formatted }}</strong>.
    } @else {
    <button (click)="reset()">Resend OTP</button>
    }
  </ng-template>
</dt-timer>`,
          },
        },
        {
          componentRef: TimerComponent,
          inputData: {
            duration: 160,
            cssStyle: { width: '100%' },
          },
          description: 'This Timer component allows dynamic duration.',
          codeSnippet: {
            html: `<dt-timer [duration]="160"></dt-timer>`,
          },
        },
      ],
    },
    gridster: {
      description:
        'This is Gridster Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the DtGrister in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { DtGridster } from 'ng-dits-gridster';`,
          },
          properties: [
            {
              name: 'draggable',
              type: 'boolean',
              default: 'true',
              description: 'Enables or disables dragging of grid items.',
            },
            {
              name: 'resizable',
              type: 'boolean',
              default: 'true',
              description: 'Enables or disables resizing of grid items.',
            },
            {
              name: 'autoShift',
              type: 'boolean',
              default: 'true',
              description:
                'Automatically shifts items when dragging or resizing.',
            },
            {
              name: 'maxCols',
              type: 'number',
              default: '12',
              description: 'Maximum number of columns in the grid.',
            },
            {
              name: 'minCols',
              type: 'number',
              default: '3',
              description: 'Minimum number of columns in the grid.',
            },
            {
              name: 'spaceBetween',
              type: 'number',
              default: '10',
              description: 'Space between grid items in pixels.',
            },
            {
              name: 'colWidth',
              type: 'number',
              default: '105',
              description: 'Width of each column in pixels.',
            },
            {
              name: 'rowHeight',
              type: 'number',
              default: '105',
              description: 'Height of each row in pixels.',
            },
            {
              name: 'items',
              type: 'DtGridItem[]',
              default: '[]',
              description: 'Array of grid items to display.',
            },
          ],
          outputs: [
            {
              name: 'itemChange',
              type: 'EventEmitter<GridsterItem>',
              description: 'Emits when a grid item is dragged and dropped.',
            },
            {
              name: 'itemResized',
              type: 'EventEmitter<GridsterItem>',
              description: 'Emits when a grid item is resized.',
            },
            {
              name: 'itemRemoved',
              type: 'EventEmitter<GridsterItem>',
              description: 'Emits when a grid item is removed.',
            },
            {
              name: 'gridSizeChanged',
              type: 'EventEmitter<{ width: number; height: number }>',
              description: 'Emits when the grid size changes.',
            },
            {
              name: 'componentOutput',
              type: 'EventEmitter<{ eventName: string; data: any }>',
              description: 'Emits events from components inside grid items.',
            },
            {
              name: 'templateOutput',
              type: 'EventEmitter<{ item: DtGridItem; eventName: string; data: any }>',
              description: 'Emits events from templates inside grid items.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          gridster: true,
          description:
            'This Gridster component demonstrates draggable and resizable grid items with dynamic components and templates.',
          codeSnippet: {
            html: `<dt-grister [draggable]="true" [resizable]="true" [maxCols]="12" [minCols]="3" [items]="gridItems"></dt-grister>`,
            ts: `import { Component } from '@angular/core';
import { DtGrister, DtGridItem } from 'ng-dits-gridster';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  gridItems: DtGridItem[] = [
    { cols: 2, rows: 1, y: 0, x: 0, componentRef: SomeComponent, inputData: { key: 'value' } },
    { cols: 1, rows: 1, y: 0, x: 2, templateRef: SomeTemplate, templateData: { key: 'value' } },
  ];
}`,
          },
        },
      ],
    },
    number: {
      description:
        'This is Number Box Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the NumberBoxComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { NumberBoxComponent } from '../../../../../ui/components/number-box/number-box.component';`,
          },
          properties: [
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description:
                'Custom CSS styles to apply to the number box component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the number box to a reactive form.',
            },
            {
              name: 'label',
              type: 'string',
              default: 'null',
              description: 'The label to display for the number box.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: 'null',
              description: 'The placeholder text for the number box.',
            },
            {
              name: 'readonly',
              type: 'boolean',
              default: 'false',
              description: 'Indicates whether the number box is read-only.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<number>',
              description: 'Emits the value of the number box when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: NumberBoxComponent,
          inputData: {
            control: this.form.controls.numberBox,
            label: 'Enter a number',
            placeholder: 'Type here...',
            cssStyle: { width: '25%' },
          },
          description:
            'This Number Box component integrates with reactive forms, allows dynamic label and placeholder binding, and supports custom styles.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-number-box [control]="form.controls.numberBox" [label]="'Enter a number'" [placeholder]="'Type here...'" [cssStyle]="{ 'width': '25%' }"></dt-number-box>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NumberBoxComponent } from '../../../../../ui/components/number-box/number-box.component';

@Component({
  selector: 'app-example',
  imports: [NumberBoxComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      numberBox: new FormControl(null),
    });
  }
}`,
          },
        },
      ],
    },
    text: {
      description:
        'This is Text Box Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the TextBoxComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { TextBoxComponent } from '../../../../../ui/components/text-box/text-box.component';`,
          },
          properties: [
            {
              name: 'cssStyle',
              type: 'object',
              default: '{}',
              description:
                'Custom CSS styles to apply to the text box component.',
            },
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the text box to a reactive form.',
            },
            {
              name: 'label',
              type: 'string',
              default: 'null',
              description: 'The label to display for the text box.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: 'null',
              description: 'The placeholder text for the text box.',
            },
            {
              name: 'readonly',
              type: 'boolean',
              default: 'false',
              description: 'Indicates whether the text box is read-only.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<string>',
              description: 'Emits the value of the text box when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: TextBoxComponent,
          inputData: {
            control: this.form.controls.textBox,
            label: 'Enter text',
            placeholder: 'Type here...',
            cssStyle: { width: '25%' },
          },
          description:
            'This Text Box component integrates with reactive forms, allows dynamic label and placeholder binding, and supports custom styles.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-text-box [control]="form.controls.textBox" [label]="'Enter text'" [placeholder]="'Type here...'" [cssStyle]="{ 'width': '25%' }"></dt-text-box>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TextBoxComponent } from '../../../../../ui/components/text-box/text-box.component'];

@Component({
  selector: 'app-example',
  imports: [TextBoxComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      textBox: new FormControl(''),
    });
  }
}`,
          },
        },
      ],
    },
    error: {
      description:
        'This is Error Message Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the DtErrorMessage in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { DtErrorMessage } from '../../../../../ui/components/error-message/error-message.component';`,
          },
          properties: [
            {
              name: 'control',
              type: 'AbstractControl',
              default: 'null',
              description: 'The AbstractControl instance to bind the error message to a reactive form control.',
            },
            {
              name: 'validations',
              type: '{ [key: string]: string }',
              default: '{}',
              description: 'An object containing validation error messages mapped by their keys.',
            },
            {
              name: 'markAsTouched',
              type: 'boolean',
              default: 'false',
              description: 'Indicates whether to mark the control as touched.',
            },
            {
              name: 'cssStyle',
              type: '{ [klass: string]: string | number }',
              default: '{}',
              description: 'Custom CSS styles to apply to the error message.',
            },
          ],
          outputs: []
        },
      ],
      exampleComponent: [
        {
          componentRef: TextBoxComponent,
          inputData: {
            control: this.form.controls.textBox,
            validations: this.textBoxValidations,
            markAsTouched: true,
            label:'Add Text',
            cssStyle: { color: 'red' },
          },
          description: 'This Error Message component integrates with reactive forms and displays validation error messages dynamically.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-text-box [control]="form.controls.textBox" [label]="'Enter text'" [placeholder]="'Type here...'" [validations]="textBoxValidations" [markAsTouched]="true" [cssStyle]="{ 'width': '25%' }"></dt-text-box>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DtErrorMessage } from '../../../../../ui/components/error-message/error-message.component';

@Component({
  selector: 'app-example',
  imports: [Text],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup;
  textBoxValidations = {
    required: 'This field is required.',
  };

  ngOnInit() {
    this.form = new FormGroup({
      textBox: new FormControl('', [Validators.required]),
    });
  }
}`,
          },
        },
      ],
    },
    'phone number': {
      description:
        'This is Phone Number Component, which demonstrates advanced functionality.',
      tabView: true,
      api: [
        {
          description:
            'To implement this standalone component, you need to import the PhoneNumberComponent in your module or in component and use it in your template.',
          codeSnippet: {
            ts: `import { PhoneNumberComponent } from '../../ui/components/phone-number/phone-number.component',`
          },
          properties: [
            {
              name: 'control',
              type: 'FormControl',
              default: 'null',
              description:
                'The FormControl instance to bind the phone number input to a reactive form.',
            },
            {
              name: 'countryName',
              type: 'string',
              default: 'null',
              description:
                'The default country name to preselect in the dropdown.',
            },
            {
              name: 'showFlag',
              type: 'boolean',
              default: 'true',
              description: 'Indicates whether to display the country flag.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: `'Enter phone number'`,
              description: 'The placeholder text for the phone number input.',
            },
            {
              name: 'value',
              type: 'object',
              default: 'null',
              description:
                'The phone number value, including country code and formatted number.',
            },
          ],
          outputs: [
            {
              name: 'valueChange',
              type: 'EventEmitter<object>',
              description:
                'Emits the phone number data, including country name, dial code, and formatted number, when it changes.',
            },
          ],
        },
      ],
      exampleComponent: [
        {
          componentRef: PhoneNumberComponent,
          inputData: {
            control: this.form.controls.phone,
            countryName: 'India',
          },
          description:
            'This Phone Number component integrates with reactive forms and allows preselecting a default country.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-phone-number [control]="form.controls.phone" [countryName]="'India'"></dt-phone-number>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PhoneNumberComponent } from '../../ui/components/phone-number/phone-number.component'];

@Component({
  selector: 'app-example',
  imports: [PhoneNumberComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(''),
    });
  }
}`,
          },
        },
        {
          componentRef: PhoneNumberComponent,
          inputData: {
            control: this.form.controls.phone,
            showFlag: false,
          },
          description:
            'This Phone Number component integrates with reactive forms and hides the country flag.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-phone-number [control]="form.controls.phone" [showFlag]="false"></dt-phone-number>
</form>`,
            ts: `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PhoneNumberComponent } from '../../ui/components/phone-number/phone-number.component'];

@Component({
  selector: 'app-example',
  imports: [PhoneNumberComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(''),
    });
  }
}`,
          },
        },
        {
          componentRef: PhoneNumberComponent,
          inputData: {
            value: this.phoneNumber,
            placeholder: 'Enter PhoneNumber',
          },
          description:
            'This Phone Number component supports two-way data binding and allows setting a custom placeholder.',
          codeSnippet: {
            html: `<form [formGroup]="form">
  <dt-phone-number [(value)]="phoneNumber" [placeholder]="'Enter PhoneNumber'"></dt-phone-number>
</form>`,
            ts: `import { Component } from '@angular/core';
import { PhoneNumberComponent } from '../../ui/components/phone-number/phone-number.component'];

@Component({
  selector: 'app-example',
  imports: [PhoneNumberComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss']
})
export class ExampleComponent {
  phoneNumber='';
}`,
          },
        },
      ],
    },
  };
}
