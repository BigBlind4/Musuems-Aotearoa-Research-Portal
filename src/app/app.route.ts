import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';
import { UserProfileComponent } from '../userprofile/userprofile.component';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../login/forgotpassword.component';
import { UploadComponent } from '../upload/upload.component';
import { UploadListComponent } from '../upload/uploadlist.component';
import { UpdatePasswordComponent } from '../userprofile/updatepassword.component';
import { PostListComponent } from '../messageboard/postlist.component';
import { NewPostComponent } from '../messageboard/newpost.component';
import { MyTopicComponent } from '../messageboard/mytopic.component';
import { PostDetailComponent } from '../messageboard/postdetail.component';
import { ApprovalListComponent } from '../approvallist/approvallist.component';
import { ApprovalDetailComponent } from '../approvallist/approvaldetail.component';

export const appRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'userprofile', component: UserProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'updatepassword', component: UpdatePasswordComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'upload/:userid/:uploadid/:fileid', component: UploadComponent },
    { path: 'uploadlist', component: UploadListComponent },
    { path: 'postlist', component: PostListComponent },
    { path: 'mytopic', component: MyTopicComponent },
    { path: 'newpost', component: NewPostComponent },
    { path: 'newpost/:topicid/:editmode', component: NewPostComponent },
    { path: 'postdetail', component: PostDetailComponent },
    { path: 'postdetail/:topicid', component: PostDetailComponent },
    { path: 'approvallist', component: ApprovalListComponent },
    { path: 'approvaldetail', component: ApprovalDetailComponent },
    { path: 'approvaldetail/:userid/:uploadid', component: ApprovalDetailComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]