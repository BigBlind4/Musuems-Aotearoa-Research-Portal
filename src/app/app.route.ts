import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';
import { UserProfileComponent } from '../userprofile/userprofile.component';

export const appRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'userprofile', component: UserProfileComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]