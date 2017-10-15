import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './app.route';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { NavComponent } from '../nav/nav.component';
import { SearchComponent } from '../search/search.component';
import { UserProfileComponent } from '../userprofile/userprofile.component';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../login/forgotpassword.component';
import { MyAccountNavComponent } from '../nav/myaccountnav.component';
import { UploadListComponent } from '../upload/uploadlist.component';

import { StorageService } from '../shared/storage.service';
import { UIChangeNotificationService } from '../shared/uichangenotification.service';
import { SearchService } from '../search/search.service';
import { HttpWrapperService } from '../shared/httpwrapper.service';
import { UserDataService } from '../shared/userdata.service';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { UploadComponent } from '../upload/upload.component';
import { LoginService } from '../login/login.service';
import { UploadService } from '../upload/upload.service';
import { UpdatePasswordComponent } from '../userprofile/updatepassword.component';
import { PostListComponent } from '../messageboard/postlist.component';
import { MyTopicComponent } from '../messageboard/mytopic.component';
import { NewPostComponent } from '../messageboard/newpost.component';
import { PostDetailComponent } from '../messageboard/postdetail.component';
import { ApprovalListComponent } from '../approvallist/approvallist.component';
import { ApprovalDetailComponent } from '../approvallist/approvaldetail.component';
import { PostService } from '../messageboard/post.service';
import { ApproveService } from '../approvallist/approve.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    ),
    AngularFontAwesomeModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SearchComponent,
    UserProfileComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UploadComponent,
    MyAccountNavComponent,
    UploadListComponent,
    UpdatePasswordComponent,
    PostListComponent,
    NewPostComponent,
    MyTopicComponent,
    PostDetailComponent,
    ApprovalListComponent,
    ApprovalDetailComponent
  ],
  providers: [
    StorageService,
    UIChangeNotificationService,
    SearchService,
    HttpWrapperService,
    UserDataService,
    LoginService,
    UploadService,
    PostService,
    ApproveService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
