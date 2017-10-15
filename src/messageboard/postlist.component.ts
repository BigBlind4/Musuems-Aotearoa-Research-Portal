import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS , DEFAULT_VALUES} from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router } from '@angular/router';
import { PostService } from './post.service';

@Component({
  selector: 'postlist',
  templateUrl: './postlist.component.html'
})
export class PostListComponent  {
  protected postList: string = '';
  protected count: number = 0;
  protected p: number = 1;
  protected itemperpage: number = DEFAULT_VALUES.ITEM_PER_PAGE;
  private postRequest: string;

  constructor(private storageService: StorageService, private userDataService: UserDataService,
    private router: Router, private postService: PostService) {}

  ngOnInit() {
    this.postList = '';
    this.postRequest = this.postService.preparePostRequest(this.itemperpage, this.p);
    this.userDataService.getPostList(this.postRequest).subscribe(data => {
      if (data != null) {
        this.postList = data.list;
        this.count = data.totalcount;
      }
    });
  }

  getPostByTopicId(topicid: string) {
     this.router.navigate(['/postdetail', topicid]);
  }

  pageChanged(p: number) {
    this.p = p;
    this.postRequest = this.postService.preparePostRequest(this.itemperpage, p);
    this.userDataService.getPostList(this.postRequest).subscribe(data => {
      if (data != null) {
        this.postList = data.list;
      }
    });
  }
}