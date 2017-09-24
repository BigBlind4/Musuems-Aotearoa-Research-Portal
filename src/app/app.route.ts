import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';
import { UserProfileComponent } from '../userprofile/userprofile.component';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../login/forgotpassword.component';
import { UploadComponent } from '../upload/upload.component';
import { UploadListComponent } from '../upload/uploadlist.component';
import { UpdatePasswordComponent } from '../userprofile/updatepassword.component';

export const appRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'userprofile', component: UserProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'updatepassword', component: UpdatePasswordComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'upload/:userid/:uploadid/:fileid', component: UploadComponent },
    { path: 'uploadlist', component: UploadListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]