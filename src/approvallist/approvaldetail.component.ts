import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadModel } from '../models/upload.model';

@Component({
  selector: 'approvaldetail',
  templateUrl: './approvaldetail.component.html'
})
export class ApprovalDetailComponent  {
    protected title: string = '';
    protected username: string = '';
    protected description: string = '';
    protected tags: string = '';
    protected comments: string = '';
    protected displayFileName: string = '';
    protected sourceUrl: string = '';
  protected author: string = '';
    protected approveMessage: string = '';
    protected approveError: boolean = false;
    private userid: string = '';
    private uploadid: string = '';

    approvalReq: UploadModel;

    constructor(private userDataService: UserDataService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        // this.pageTitle = 'Edit Upload';
         this.uploadid = params.uploadid;
         
        // this.storageService.setStoredData(SESSION_KEYS.UPLOAD_ID, this.uploadid);
        // this.fileid = params.fileid;
        //  this.storageService.setStoredData(SESSION_KEYS.FILE_ID, this.fileid);
          this.userid = params.userid;
         if (params.uploadid !== undefined && params.uploadid !== '' && params.userid !== undefined && params.userid !== '')  {  
           this.getFileDetails(params.userid, params.uploadid);
          // this.editMode = true;
         } 
       });
    }

    getFileDetails(userid: string, uploadid: string) {
      let request = '?userid=' + userid + '&uploadid=' + uploadid;
      this.userDataService.getFileById(request).subscribe(data => {
        this.title = data.title;
        this.username = data.username;
        this.author = data.author;
        this.description = data.description;
        this.displayFileName = data.fileid;
        this.sourceUrl = data.resource;
      },
      error => {
        console.log(error._body);
      });
      
    }


    approvalAction(action: string) {
      if(action === 'reject' && this.comments === '') {
        this.approveError = true;
        this.approveMessage = 'Please put comments if you want to reject it.';
      } else {
        this.approvalReq = new UploadModel();
        this.approvalReq.userid = this.userid;
        this.approvalReq.uploadid = this.uploadid;
        this.approvalReq.comment = this.comments;
        this.approvalReq.action = action;
        this.userDataService.uploadAction(this.approvalReq).subscribe( data => {
          if (data != null) {
            this.approveMessage = data.message;
            if(String(data.status) === '1') {
              this.approveError = false;
            } else {
              this.approveError = true;
            }
          }
        }, error => {
          this.approveMessage = error._body;
          this.approveError = true;
        });
      }
    }

}