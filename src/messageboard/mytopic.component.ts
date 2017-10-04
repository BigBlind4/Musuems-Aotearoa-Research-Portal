import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router } from '@angular/router';
import { PostService } from './post.service';

@Component({
  selector: 'mytopic',
  templateUrl: './mytopic.component.html'
})
export class MyTopicComponent  {
    private userid: string;

    protected count: number;
    protected myTopicList: string;
    protected itemperpage: number = 2;
    protected p: number = 1;

    constructor(private storageService: StorageService, private userDataService: UserDataService,
      private postService: PostService, private router: Router) {}

    ngOnInit() {
      this.myTopicList = '';
      if (this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
        this.userid = this.storageService.getStoredData(SESSION_KEYS.USER_ID);
        let postReq = this.postService.prepareUserPostRequest(this.userid, this.itemperpage, this.p);
        this.userDataService.getPostListByUserId(postReq).subscribe(data => {
          this.myTopicList = data.list;
          this.count = data.totalcount;
        });
      } else {
        this.router.navigate(['/login']);
      }
    }

    pageChanged(p: number) {
      this.p = p;
      let postReq = this.postService.prepareUserPostRequest(this.userid, this.itemperpage, p);
      this.userDataService.getPostListByUserId(postReq).subscribe(data => {
        if (data != null) {
          this.myTopicList = data.list;
        }
      });
    }

    editTopic(topicid: string, editmode: boolean) {
      this.router.navigate(['/newpost', topicid, editmode]);
    }

}