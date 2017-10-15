import { Component } from '@angular/core'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';

@Component({
  selector: 'updatepassword',
  templateUrl: './updatepassword.component.html'
})
export class UpdatePasswordComponent  {
    protected passwordForm: FormGroup;
    protected isDifferent: boolean = false;
    protected updateError: boolean = false;
    protected updateMessage: string = '';

    updateRequest: UserModel;

    constructor(private formBuilder: FormBuilder, private storageService: StorageService,
      private userDataService: UserDataService) {}

    ngOnInit() {
      this.isDifferent = false;
      this.passwordForm = this.formBuilder.group({
        oldpassword: ['', Validators.required],
        newpassword: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      });
    }

    checkConfirmPassword() {
      let newpwd = this.passwordForm.controls['newpassword'].value;
      let confirmpwd = this.passwordForm.controls['confirmpassword'].value;
      if(newpwd !== '' && confirmpwd !=='' && newpwd !== confirmpwd) {
        this.isDifferent = true;
      } else {
        this.isDifferent = false;
      }

    }
    updatePassword() {
      this.checkConfirmPassword();
      if(!this.isDifferent) {
        this.updateRequest = new UserModel();
        if(this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
          this.updateRequest.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID) );
        }
        
        this.updateRequest.password = this.passwordForm.controls['oldpassword'].value;
        this.updateRequest.newpassword = this.passwordForm.controls['newpassword'].value;
        
  
        if(this.updateRequest.password !== '' && this.updateRequest.newpassword !== '') {
          this.userDataService.updatePassword(this.updateRequest).subscribe( data => {
            if (data != null) {
              if (String(data.status) === '1') {
                this.updateError = false;
                this.updateMessage = 'Your password has been updated successfully.';
              } else {
                this.updateError = true;
                this.updateMessage = 'Update failed, please try again.';
              }
            }
          },
          error => {
            this.updateError = true;
            this.updateMessage = error._body;
          });
        }
      }
    }
}