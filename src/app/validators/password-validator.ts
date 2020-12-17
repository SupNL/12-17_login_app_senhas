import { FormGroup } from "@angular/forms";

export class PasswordValidator {
    static areEqual(controlName : string, matching : string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matching];
    
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
    
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ areEqual: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
