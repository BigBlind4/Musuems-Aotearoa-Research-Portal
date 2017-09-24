import { Component } from '@angular/core'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'updatepassword',
  templateUrl: './updatepassword.component.html'
})
export class UpdatePasswordComponent  {
    protected passwordForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
      this.passwordForm = this.formBuilder.group({
        oldpassword: ['', Validators.required],
        newpassword: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      });
    }

    updatePassword() {

    }
}