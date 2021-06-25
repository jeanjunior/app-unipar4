import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export const validateAllFormFields = (formGroup: FormGroup): void => {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
      control.updateValueAndValidity({ emitEvent: false, onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
};

export const hasErrors = (control: AbstractControl | null): boolean => {
  return (control && control.errors && (control.dirty || control.touched)) && control.invalid || false;
};
