import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UploadModel } from '../models/upload.model';

@Component({
  selector: 'uploadlist',
  templateUrl: './uploadlist.component.html'
})
export class UploadListComponent  {
  protected uploadlist: string = '';
  // protected removeError: boolean = false;
  // protected removeMessage: string = '';
  protected count: number = 0;

  constructor(private storageService: StorageService, private userDataService: UserDataService,
    private router: Router) {}

  ngOnInit() {
    // this.removeError = false;
    // this.removeMessage = '';

    if (this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
      let userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
      userid = '?userid=' + userid;
      this.userDataService.getUploadList(userid).subscribe(data => {
        if (data != null){
          this.uploadlist = data;
          this.count = this.uploadlist.length;
        }
      });
    }
  }

  getDetail(uploadid: string, fileid: string) {
    let userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
    this.router.navigate(['/upload', userid, uploadid, fileid]);
  }

  // removeUpload(uploadid: string) {
  //   let removeReq = new UploadModel();
  //   removeReq.userid = this.storageService.getStoredData(SESSION_KEYS.USER_ID);
  //   removeReq.uploadid = uploadid;

  //   this.userDataService.removeUpload(removeReq).subscribe(data => {
  //     this.uploadlist = data;
  //     this.count = this.uploadlist.length;
  //   },
  //   error => {
  //     this.removeError = true;
  //     this.removeMessage = error._body;
  //   });
  // }
}