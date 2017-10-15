import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ApproveService {
    constructor() {}

    prepareApprovalListRequest(perpage: number, page: number) {
        return '?perpage=' + String(perpage) + '&page=' + String(page);
    }
}