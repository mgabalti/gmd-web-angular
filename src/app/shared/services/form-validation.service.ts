import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }
  markFieldsAsDirty(form: any) {
    for (const key in form.controls) {
      form.controls[key].markAsDirty();
      form.controls[key].markAsTouched();
      form.controls[key].updateValueAndValidity();
    }
  }
}
