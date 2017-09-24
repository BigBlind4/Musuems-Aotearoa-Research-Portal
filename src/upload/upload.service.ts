
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { UserDataService } from '../shared/userdata.service';

@Injectable()
export class UploadService {

  constructor(private http: Http, private userDataService: UserDataService) {}

  public prepareUploadFile(fileInput: any) {
  }
}