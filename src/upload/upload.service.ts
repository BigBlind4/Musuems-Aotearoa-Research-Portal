
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { UserDataService } from '../shared/userdata.service';

@Injectable()
export class UploadService {

  constructor(private http: Http, private userDataService: UserDataService) {}

  public prepareUploadFile(fileInput: any) {
    
    
    
  }
  // postTicket(filesList: FileList): Observable<HttpEvent<any>> {
  //   if (!filesList || filesList.length === 0) {
  //     return Observable.throw("Please select a file.");
  //   }

  //   const formData: FormData = new FormData();

  

  //   for (let i = 0; i < filesList.length; i++) {
  //     formData.append(filesList[i].name, filesList[i]);
  //   }

  //   const headers = new HttpHeaders().set("Accept", "application/json");
  //   //return '{result: 1}';
  //   return this.http
  //     .post(`${this.baseUrl}/SaveTicket`, formData, {
  //       headers: headers,
  //       reportProgress: true,
  //       observe: "events"
  //     })
  //     .map(response => response || {})
  //     .catch((error: HttpErrorResponse) => {
  //       console.error("observable error: ", error);
  //       return Observable.throw(error.statusText);
  //     });
  //}
}