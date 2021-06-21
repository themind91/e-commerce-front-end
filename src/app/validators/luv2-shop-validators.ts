import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    // whitespace custom validation

    static notOnlyWhiteSpace(control: FormControl) :ValidationErrors{

        // check if string has only white spaces

        if(control.value != null && control.value.trim().length === 0){
            // invalid return error object

            return{'notOnlyWhiteSpace':true}
        }

        return null!;
    }
}
