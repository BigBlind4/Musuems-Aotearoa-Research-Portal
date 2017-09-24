import { Component } from '@angular/core'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserModel } from '../models/user.model';
import { UserDataService } from '../shared/userdata.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'userprofile',
  templateUrl: './userprofile.component.html'
})
export class UserProfileComponent  {
    protected profileForm: FormGroup;
    protected userid: string = '';
    private updateRequest: UserModel;
    protected updateError: boolean = false;
    protected updateMessage: string = '';
    protected validEmail: boolean = true;

    constructor(private formBuilder: FormBuilder, private storageService: StorageService,
      private userDataService: UserDataService, private loginService: LoginService) {}

    ngOnInit() {
      this.updateError = false;
      this.updateMessage = '';
      this.validEmail = true;

      this.profileForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        firstname: [''],
        lastname: ['']
      });

      if(this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
        this.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
      }
    }

    checkEmail() {
      let email = this.profileForm.controls['email'].value;
      // if(email === '') {
      //   this.validEmail = true;
      //   return;
      // }
      
      if(!this.loginService.validateEmail(email)) {
        this.validEmail = false;
      } else {
        this.validEmail = true;
      }
    }

    updateProfile() {
      this.updateRequest = new UserModel();
      this.updateRequest.userid = this.userid;
      this.updateRequest.username = this.profileForm.controls['username'].value;
      this.updateRequest.email = this.profileForm.controls['email'].value;
      this.updateRequest.firstname = this.profileForm.controls['firstname'].value;
      this.updateRequest.lastname = this.profileForm.controls['lastname'].value;

      if(this.updateRequest.username !== '' && this.updateRequest.email !== '') {
        this.userDataService.updateProfile(this.updateRequest).subscribe( data => {
          if (data != null) {
            if (String(data.status) === '1') {
              this.updateError = false;
              this.updateMessage = 'Your profile has been updated successfully.';
            } else {
              this.updateError = true;
              this.updateMessage = 'Update failed, please try again.';
            }
          }
        },
        error => {
          this.updateError = true;
          console.log(error._body);
        });
      }
    }
}