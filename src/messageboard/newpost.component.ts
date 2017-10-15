import { Component } from '@angular/core'; 
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS } from '../shared/constants';
import { UserDataService } from '../shared/userdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostModel } from '../models/post.model';
import { PostService } from './post.service';

@Component({
  selector: 'newpost',
  templateUrl: './newpost.component.html'
})
export class NewPostComponent  {
    protected newPostForm: FormGroup;
    protected postMessage: string = '';
    private userid: string = '';
    protected postError: boolean = false;
    protected editMode: boolean = false;
    protected postTitle: string = '';
    protected postButton: string = '';
    postRequst: PostModel;
    private topicid: string;

    constructor(private formBuilder: FormBuilder, private storageService: StorageService,
        private userDataService: UserDataService, private activatedRoute: ActivatedRoute,
        private postService: PostService, private router: Router) {}

    ngOnInit() {
        this.postMessage = '';
        this.postError = false;

        this.newPostForm = this.formBuilder.group({
            title: ['', Validators.required],
            details: ['', Validators.required],
            tags: ['']
          });

        if (this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
            this.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
            this.activatedRoute.params.subscribe(params => {
                if (params != null && params.topicid !== '') {
                  this.storageService.setStoredData(SESSION_KEYS.TOPIC_ID, params.topicid);
                  this.topicid = params.topicid;
                  if (params.editmode) {
                    this.editMode = true;
                    this.postTitle = 'Edit Post';
                    this.postButton = 'Update';
                    this.getPostEditDetail(this.topicid);
                  } else {
                    this.editMode = false;
                    this.postTitle = 'New Post';
                    this.postButton = 'Create';
                  }
                }
              });
        } else {
            this.router.navigate(['/login']);
        }
    }

    getPostEditDetail(topicid: string) {
        this.storageService.setStoredData(SESSION_KEYS.TOPIC_ID, topicid);
        let topicReq = this.postService.prepareTopicIdReq(topicid);
        this.topicid = topicid;
        this.userDataService.getPostEditDetail(topicReq).subscribe( data => {
            if (data != null) {
                this.newPostForm.controls['title'].setValue(data.title);
                this.newPostForm.controls['details'].setValue(data.details);
                this.newPostForm.controls['tags'].setValue(data.tags);
            }
        });
    }

    post() {
        this.postRequst = new PostModel();
        this.postRequst.userid = this.userid;
        this.postRequst.title = this.newPostForm.controls['title'].value;
        this.postRequst.details = this.newPostForm.controls['details'].value;
        this.postRequst.tags = this.newPostForm.controls['tags'].value;
        this.postRequst.topicid = this.topicid;
        if(this.editMode) {
            this.userDataService.updatePost(this.postRequst).subscribe( data => {
                if (data != null) {
                    this.postMessage = data.message;
                    if (data.status === 0) {
                        this.postError = false;
                        this.router.navigate(['/mytopic']);
                    } else {
                        this.postError = true;
                    }
                }
            },
            error => {
                this.postError = true;
                this.postMessage = error._body;
            });
        } else {

        this.userDataService.createPost(this.postRequst).subscribe( data => {
            if (data != null) {
                this.postMessage = data.message;
                if (data.status === 0) {
                    this.postError = false;
                    this.router.navigate(['/mytopic']);
                } else {
                    this.postError = true;
                }
            }

        },
        error => {
            this.postError = true;
            this.postMessage = error._body;
        });
    }
    }

    deletePost() {
        this.topicid = this.postService.prepareTopicIdReq(this.topicid);
        this.userDataService.deletePost(this.topicid).subscribe(data => {
            if (data != null) {
                this.postMessage = data.message;
                this.router.navigate(['/mytopic']);
            }

        });
    }
}