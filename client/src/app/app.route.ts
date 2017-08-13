import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';

export const appRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'search', component: SearchComponent },
    // { path: 'search/:item', component: SearchComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]