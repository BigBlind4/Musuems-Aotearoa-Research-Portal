import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UserDataService } from '../shared/userdata.service';

@Injectable()
export class LoginService {
    constructor(private userDataService: UserDataService) {}

    validateEmail (emailAdd: string) {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (EMAIL_REGEXP.test(emailAdd)) {
            return true;
        }

        return false;
    }
}
