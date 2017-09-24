import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpWrapperService {
    constructor(private http: Http) {}

    postRequest(url: string, postbody: string) {
        let hders = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: hders });

        return this.http
            .post(url , postbody, options)
            .map(response => response.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw('Server error' || error.json());
            });
    }

    getRequest(url: string, getbody: string) {
        return this.http
            .get(url + getbody)
            .map(response => response.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw('Server error' || error.json());
            });
    }

}