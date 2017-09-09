import { Injectable } from '@angular/core';
import { HttpWrapperService } from './httpwrapper.service';
import { API_METHODS } from './constants';

@Injectable()
export class UserDataService {
    constructor(private httpWrapperService: HttpWrapperService) {}

    login(loginRequest: any) {
     let body = JSON.stringify(loginRequest);
     return this.httpWrapperService.postRequest(API_METHODS.LOGIN, body);
    }

    search(searchRequest: string) {
       // let body = JSON.stringify(searchRequest);
        return this.httpWrapperService.getRequest(API_METHODS.SEARCH, searchRequest);

    }
}