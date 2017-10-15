import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS, ROLES , DEFAULT_VALUES} from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { CommentModel, PostModel } from '../models/post.model';

@Component({
  selector: 'postdetail',
  templateUrl: './postdetail.component.html'
})
export class PostDetailComponent  {
    protected commentList: string = '';
    protected count: number = 0;
    protected commentMessage: string = '';
    protected itemperpage: number = DEFAULT_VALUES.ITEM_PER_PAGE;
    protected p: number = 1;

    protected title: string = '';
    protected username: string = '';
    protected lastupldatedate: string = '';
    protected details: string = '';
    protected tags: string = '';
    protected comments: string = '';
    protected commentError: boolean = false;
    protected editMode: boolean = false;
    //protected userid: string = '';
    protected loginUserId: string = '';
    private topicid: string = '';
    private commentid: string = '';
    protected isAdmin: boolean = false;
    protected isSameUser: boolean = true;
    commentRequest: CommentModel;
    postRequest: PostModel;

    constructor(private activatedRoute: ActivatedRoute, private userDataService: UserDataService,
      private postService: PostService, private storageService: StorageService, private router: Router) {}

    ngOnInit() {
      this.commentError = false;

      this.isAdmin = false;
      if (this.storageService.getStoredData(SESSION_KEYS.ROLE) != null &&
        this.storageService.getStoredData(SESSION_KEYS.ROLE) === ROLES.ADMIN) {
          console.log(this.storageService.getStoredData(SESSION_KEYS.ROLE));
          this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
        
      if(this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
        this.loginUserId = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
      }
      this.activatedRoute.params.subscribe(params => {
         if (params != null && params.topicid !== '') {
           this.storageService.setStoredData(SESSION_KEYS.TOPIC_ID, params.topicid);
           this.topicid = params.topicid;
           this.getPostByTopicId(params.topicid, DEFAULT_VALUES.ITEM_PER_PAGE,  1);
           if (params.editmode) {
             this.editMode = true;
           } else {
             this.editMode = false;
           }
         }
       });
    }
    
    getPostByTopicId(topicid: string, perpage: number, page: number) {
      //this.commentList = '';
      let topicReq = this.postService.prepareTopicId(topicid, perpage, page);
      this.userDataService.getPostDetailByTopicId(topicReq).subscribe (data => {

        this.title = data.topic.title;
        this.tags = data.topic.tags;
       
        this.username = data.topic.username;
        this.lastupldatedate = data.topic.lastupdate;
        this.details = data.topic.details;
        this.commentList = data.comments;
        
        this.count = data.commentsCount;
      },
      error => {

      });
    }

    addComments() {
      if (this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
        //this.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
        this.commentRequest = new CommentModel();

          this.commentRequest.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
          this.commentRequest.topicid = this.topicid;
          this.commentRequest.comments = this.comments;
          this.userDataService.addComments(this.commentRequest).subscribe(data => {
            if (data != null) {
              if (data.status === 0) {
                this.comments = '';
                this.commentError = false;
                this.getPostByTopicId(this.topicid, this.itemperpage, this.p);
              } 
            } else {
              this.commentMessage = data.message;
              this.commentError = true;
            }
          },
          error => {
            this.commentError = true;
          });
      } else {
        this.router.navigate(['/login']);
      }
    }

    deleteComment(commentid: string) {
      this.commentid = this.postService.prepareCommentReq(commentid);
      this.userDataService.deleteComments(this.commentid).subscribe(data => {
        if (data != null) {
            if(data.status === 0) {
              this.commentError = false;
              this.getPostByTopicId(this.topicid, this.itemperpage, this.p);
            }
        } else {
          this.commentError = true;
          this.commentMessage = data.message;
        }
      });
    }

    pageChanged(p: number) {
      this.p = p;
      let topicReq = this.postService.prepareTopicId(this.topicid, this.itemperpage, p);
      this.userDataService.getPostDetailByTopicId(topicReq).subscribe( data => {
        if (data != null) {
          this.commentList = data.comments;
        }
      });
    }

    deletePost() {
      this.topicid = this.postService.prepareTopicIdReq(this.topicid);
      this.userDataService.deletePost(this.topicid).subscribe(data => {
        if (data != null) {
          this.commentMessage = data.message;
          if (data.status === 0) {
            this.router.navigate(['/postlist']);
          }
        }
      });

    }
}