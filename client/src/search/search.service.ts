import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { APP_CONFIG } from '../shared/constants';

@Injectable()
export class SearchService {
    constructor(private http: Http) {}

    search(term: string, p: number) {
        if (term !== '') {
            term = term.replace(' ', '+');
            return this.http
                //.get(`http://10.140.109.23:8089/search/recordpi_key=svowNJL8JgZVmBMhUzho&text=${term}`)
                .get(APP_CONFIG.SEARCH_API + `&page=${p}&text=${term}`)
                .map(response => response.json())
                .catch((error: any) => {
                    console.log(error);
                    return Observable.throw('Server error' || error.json());
                });
        }
    }
}