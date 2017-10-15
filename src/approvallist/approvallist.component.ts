import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS, DEFAULT_VALUES } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router } from '@angular/router';
import { ApproveService } from './approve.service';

@Component({
  selector: 'approvallist',
  templateUrl: './approvallist.component.html'
})
export class ApprovalListComponent  {
    protected count: number = 0;
    protected approvalList: string = '';
    protected p: number = 1;
    protected itemperpage: number = DEFAULT_VALUES.ITEM_PER_PAGE;
    protected approvalListReq: string = '';

    constructor(private approveService: ApproveService, private userDataService: UserDataService,
      private router: Router) {}

    ngOnInit() {
      this.approvalList = '';
      this.approvalListReq = this.approveService.prepareApprovalListRequest(this.itemperpage, this.p);
      this.userDataService.getApprovalList(this.approvalListReq).subscribe(data => {
        if (data != null) {
          this.approvalList = data.list;
          this.count = data.totalcount;
        }
      });
    }

    getDetail(userid: string, uploadid: string) {
      this.router.navigate(['/approvaldetail', userid, uploadid]);
    }

    pageChanged(p: number) {
      this.p = p;
      this.approvalListReq = this.approveService.prepareApprovalListRequest(this.itemperpage, p);
      this.userDataService.getApprovalList(this.approvalListReq).subscribe(data => {
        if (data != null) {
          this.approvalList = data.list;
        }
      });
    }
}