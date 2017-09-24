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

    updateProfile(updateRequest: any) {
        let body = JSON.stringify(updateRequest);
        return this.httpWrapperService.postRequest(API_METHODS.UPDATE_PROFILE, body);
    }

    search(searchRequest: string) {
       // let body = JSON.stringify(searchRequest);
        return this.httpWrapperService.getRequest(API_METHODS.SEARCH, searchRequest);
    }

    uploadFile(file: any) {
        let body = JSON.stringify(file);
        return this.httpWrapperService.postRequest(API_METHODS.UPLOAD_FILE, body);
    }

    upload(uploadRequest: any) {
        let body = JSON.stringify(uploadRequest);
        return this.httpWrapperService.postRequest(API_METHODS.UPLOAD, body);
    }

    updateUpload(uploadRequest: any) {
        let body = JSON.stringify(uploadRequest);
        return this.httpWrapperService.postRequest(API_METHODS.UPDATE_UPLOAD, body);
    }

    getUploadList(userid: string) { //
        return this.httpWrapperService.getRequest(API_METHODS.GET_UPLOAD_LIST, userid);
    }

    getFileById(fileid: string) { //?
        return this.httpWrapperService.getRequest(API_METHODS.GET_FILE_BY_ID, fileid);
    }

    removeFileById(removeRequest: any) {
        let body = JSON.stringify(removeRequest);
        return this.httpWrapperService.postRequest(API_METHODS.REMOVE_FILE_BY_ID, body);
    }

    removeUpload(removeRequest: any) {
        let body = JSON.stringify(removeRequest);
        return this.httpWrapperService.postRequest(API_METHODS.REMOVE_UPLOAD, body);
    }
}