import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';
import { UserProfileComponent } from '../userprofile/userprofile.component';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from "../login/forgotpassword.component";

export const appRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'userprofile', component: UserProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]