import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UserDataService } from '../shared/userdata.service';

@Injectable()
export class SearchService {
    constructor(private userDataService: UserDataService) {}

    prepareSearchRequest(term: string, p: number) {
        if (term !== '') {
            term = term.replace(' ', '+');
            let searchParam = '&page=' + String(p) + '&text=' + term;
            return searchParam;

            // return this.http
            //     //.get(`http://10.140.109.23:8089/search/record/api_key=svowNJL8JgZVmBMhUzho&text=${term}`)
            //     .get(API_METHODS.SEARCH + `&page=${p}&text=${term}`)
            //     .map(response => response.json())
            //     .catch((error: any) => {
            //         console.log(error);
            //         return Observable.throw('Server error' || error.json());
            //     });
        }
    }
}