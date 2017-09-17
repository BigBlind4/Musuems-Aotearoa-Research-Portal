import { Component } from '@angular/core';
import { UserDataService } from '../shared/userdata.service';
import { LoginModel } from '../models/user.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS, CHANGE_NOTIFICATION_KEYS } from '../shared/constants';
import { Md5 } from 'ts-md5/dist/md5';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UIChangeNotificationService } from '../shared/uichangenotification.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private user: string = '';
  private password: string = '';
  private userInfo: LoginModel;
  loginForm: FormGroup;
  protected loginError: boolean = false;

  constructor(private userDataService: UserDataService, private loginService: LoginService,
    private router: Router, private storageService: StorageService, private formBuilder: FormBuilder,
    private uiChangeNotificationService: UIChangeNotificationService) {}

  ngOnInit() {
    this.user = '';
    this.password = '';
    this.loginError = false;
    
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.user = this.loginForm.controls['user'].value;
    this.password = this.loginForm.controls['password'].value;

    if (this.user !== undefined && this.user !== '' && this.password !== undefined && this.password !== '') {
       this.userInfo = new LoginModel();
      // //this.userInfo.password = String(Md5.hashStr(this.password)); // password encryption
       this.userInfo.password = this.password;
      if (this.loginService.validateEmail(this.user)) {
        this.userInfo.email = this.user;
      } else {
        this.userInfo.username = this.user;
      }
      this.userDataService.login(this.userInfo).subscribe( data => {
        this.storageService.setStoredData(SESSION_KEYS.LOGIN_STATUS, '1');
        this.uiChangeNotificationService.uiChanged.next(
          { key: CHANGE_NOTIFICATION_KEYS.LOGIN_STATUS_CHANGED, value: '1' });
        this.router.navigate(['/']);
      },
      error => {
        this.loginError = true;
      });
    }
    // this.user = this.loginForm.controls['user'].value;
    // this.password = this.loginForm.controls['password'].value;

    // if (this.user !== undefined && this.user !== '' && this.password !== undefined && this.password !== '') {
    //   this.user = btoa(this.user);
    //   this.password = btoa(this.password);
    //   this.loginRequest = 'u=' + this.user + '&p=' + this.password;
    //   this.userDataService.login(this.loginRequest).subscribe( data => {
    //      this.storageService.setStoredData(SESSION_KEYS.LOGIN_STATUS, String(data.status));
    //      this.router.navigate(['/userprofile']);
    //   },
    //   error => {
    //     this.loginError = true;
    //   });
    // }
  }
}
