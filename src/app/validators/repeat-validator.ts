import { FormGroup } from "@angular/forms";

export class RepeatValidator {
    static isRepeated(controlName : string, list : string[]) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];

            const isRepeated = list.some((name) => {
                return control.value === name;
            })
    
            if (isRepeated) {
                control.setErrors({ isRepeated });
            } else {
                control.setErrors(null);
            }
        }
    }
}
