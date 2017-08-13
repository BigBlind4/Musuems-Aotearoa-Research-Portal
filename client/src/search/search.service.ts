import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
    constructor(private http: Http) {}

    search(term: string) {
        if (term !== '') {
            term = term.replace(' ', '+');
            return this.http
                //.get(`http://10.140.142.221:8089/search/hello?api_key=svowNJL8JgZVmBMhUzho&text=${term}`)
                .get(`http://api.digitalnz.org/v3/records.json?api_key=svowNJL8JgZVmBMhUzho&text=${term}`)
                .map(response => response.json());
        }
    }
}