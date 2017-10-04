import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'approvallist',
  templateUrl: './approvallist.component.html'
})
export class ApprovalListComponent  {
    protected count: number = 0;
    protected approvalList: string = '';

    constructor() {}

    ngOnInit() {
    
    }

    getDetail() {

    }
}