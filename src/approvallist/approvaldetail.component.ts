import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'approvaldetail',
  templateUrl: './approvaldetail.component.html'
})
export class ApprovalDetailComponent  {
    protected title: string = '';
    protected username: string = '';
    protected details: string = '';
    protected tags: string = '';
    protected comments: string = '';
    protected displayFileName: string = '';
    protected approveMessage: string = '';
    protected approveError: boolean = false;
  
    constructor() {}

    ngOnInit() {
    
    }

    approve() {

    }

    reject() {

    }

}