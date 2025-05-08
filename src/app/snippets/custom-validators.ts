import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static matchValidator(ctrl1: string, ctrl2: string, validationErrors?: ValidationErrors): ValidatorFn {
        return ((form: FormGroup): ValidationErrors | null => {
            const controlOne = form.get(ctrl1)?.value;
            const controlTwo = form.get(ctrl2)?.value;

            if (!controlOne && !controlTwo) {
                return null;
            }

            if (controlOne !== controlTwo) { 
                return validationErrors ?? { misMatch: true };
            }
            return null;
        }) as ValidatorFn;
    }

    static minDateValidator(minDate: Date, validationErrors?: ValidationErrors): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            const inputDate = new Date(control.value).getTime();
            const min = minDate.getTime();

            if (inputDate < min) {
                return validationErrors ?? { minDate: { requiredMin: minDate, actual: control.value } };
            }
            return null;
        };
    }

    static maxDateValidator(maxDate: Date, validationErrors?: ValidationErrors): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            const controlValue = new Date(control.value).getTime();
            const max = maxDate.getTime();

            if (controlValue > max) {
                return validationErrors ?? { maxDate: { requiredMax: maxDate, actual: control.value } };
            }
            return null;
        };
    }

    static dateRangeValidator(ctrl1: string, ctrl2: string, validationErrors?: ValidationErrors): ValidatorFn {
        return ((form: FormGroup) => {
            const controlOne = form.get(ctrl1)?.value;
            const controlTwo = form.get(ctrl2)?.value;

            if (!controlOne || !controlTwo) {
                return null;
            }
            const minTimestamp = new Date(controlOne).getTime();
            const maxTimestamp = new Date(controlTwo).getTime();

            if (isNaN(minTimestamp) || isNaN(maxTimestamp) || minTimestamp > maxTimestamp) {
                return validationErrors ?? { invalidDate: true };
            }
            return null;
        }) as ValidatorFn;
    }
}