import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;

        case 'email':
          return 'El email ingresado no es válido'
      }
    }
    return null
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    )
  }

  static isValidFieldArray(formArray: FormArray, index: number) {
    return(
      formArray.controls[index].touched &&
      formArray.controls[index].errors
    )
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    
    const errors = form.controls[fieldName].errors || {};

    return this.getTextError(errors);
  }

  static getFieldErrorArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors || {};

    return this.getTextError(errors);
  }

}