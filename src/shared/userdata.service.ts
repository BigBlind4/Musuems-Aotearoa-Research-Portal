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

    createPost(postRequest: any) {
        let body = JSON.stringify(postRequest);
        return this.httpWrapperService.postRequest(API_METHODS.CREATE_POST, body);
    }

    getPostList(postRequest: string) {
        return this.httpWrapperService.getRequest(API_METHODS.GET_POST_LIST, postRequest);
    }

    getPostListByUserId (postRequest: string) {
        return this.httpWrapperService.getRequest(API_METHODS.GET_POST_LIST_BY_USER_ID, postRequest);
    }
    getPostDetailByTopicId(topicid: string) {
        return this.httpWrapperService.getRequest(API_METHODS.GET_POST_DETAIL_BY_TOPIC_ID, topicid);
    }

    addComments (commentReq: any) {
        let body = JSON.stringify(commentReq);
        return this.httpWrapperService.postRequest(API_METHODS.ADD_COMMENTS, body);
    }

    // deleteComments(commentReq: any) {
    //     let body = JSON.stringify(commentReq);
    //     return this.httpWrapperService.postRequest(API_METHODS.DELETE_COMMENTS, body);
    // }

    deleteComments(commentid: string) {
        //let body = JSON.stringify(commentReq);
        return this.httpWrapperService.getRequest(API_METHODS.DELETE_COMMENTS, commentid);
    }

    updatePost(postRequest: any) {
        let body = JSON.stringify(postRequest);
        return this.httpWrapperService.postRequest(API_METHODS.UPDATE_POST, body);
    }

    // getComments(commentRequest: string) {
    //     return this.httpWrapperService.getRequest(API_METHODS.GET_COMMENTS, commentRequest);
    // }

    deletePost(topicid: string) {
        return this.httpWrapperService.getRequest(API_METHODS.DELETE_POST, topicid);
    }

    getPostEditDetail(topicReq: any) {
        return this.httpWrapperService.getRequest(API_METHODS.GET_POST_EDIT_DETAIL, topicReq);
    }

    getApprovalList(approvalReq: string) {
        return this.httpWrapperService.getRequest(API_METHODS.GET_APPROVAL_LIST, approvalReq);
    }

    uploadAction(approvalReq: any) {
        let body = JSON.stringify(approvalReq);
        return this.httpWrapperService.postRequest(API_METHODS.UPLOAD_ACTION, body);
    }

    updatePassword(updateReq: any) {
        let body = JSON.stringify(updateReq);
        return this.httpWrapperService.postRequest(API_METHODS.UPDATE_PASSWORD, body);
    }

    getUserProfile(userid: string) {
        return this.httpWrapperService.getRequest(API_METHODS.GET_USER_PROFILE, userid);
    }
}