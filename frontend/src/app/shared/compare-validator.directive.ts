import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
    selector:'[passwordEqualValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: CompareValidatorDirective,
        multi: true
    }]
})
export class CompareValidatorDirective implements Validator{
    @Input() passwordEqualValidator: string;
    validate(control:AbstractControl):{[key:string]:any} | null{
        const controlToCompare = control.parent.get(this.passwordEqualValidator);
        if (controlToCompare && controlToCompare.value !== control.value){
            return {"notEqual": true};
        }
        return null;
    }
}