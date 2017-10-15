import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
    constructor() {}

    preparePostRequest(perpage: number, page: number) {
        return '?perpage=' + String(perpage) + '&page=' + String(page);
    }

    prepareUserPostRequest(userid: string, perpage: number, page: number) {
        return '?userid=' + userid + '&perpage=' + String(perpage) + '&page=' + String(page);
    }

    prepareTopicId(topicid: string, perpage: number, page: number) {
        return '?topicid=' + topicid + '&perpage=' + perpage + '&page=' + page;
    }

    prepareTopicIdReq(topicid: string) {
        return '?topicid=' + topicid;
    }
    prepareCommentRequest(perpage: number, page: number) {
        return '?perpage=' + String(perpage) + '&page=' + String(page);
    }

    prepareCommentReq(commentid: string) {
        return '?commentid=' + commentid;
    }
    
    
}