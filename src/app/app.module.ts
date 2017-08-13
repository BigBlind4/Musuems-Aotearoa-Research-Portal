import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './app.route';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { NavComponent } from '../nav/nav.component';
import { SearchComponent } from '../search/search.component';

import { StorageService } from '../shared/storage.service';
import { UIChangeNotificationService } from '../shared/uichangenotification.service';
import { SearchService } from '../search/search.service';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    ),
    AngularFontAwesomeModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SearchComponent
  ],
  providers: [
    StorageService,
    UIChangeNotificationService,
    SearchService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
