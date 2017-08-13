import { Component } from '@angular/core';
import { Router }  from '@angular/router';
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS, CHANGE_NOTIFICATION_KEYS } from '../shared/constants';
import { UIChangeNotificationService } from '../shared/uichangenotification.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
    protected searchBar: string = '';

    constructor(private router: Router, private storageService: StorageService,
        private uiChangeNotificationService: UIChangeNotificationService) {}

    search() {
        if(this.searchBar !== undefined && this.searchBar !== ''){
            this.storageService.removeStoredData(SESSION_KEYS.SEARCH_ITEM);
            this.storageService.setStoredData(SESSION_KEYS.SEARCH_ITEM, this.searchBar);
            if (this.router.url !== '/search') {
                this.router.navigate(['/search']);
            }else {
                this.uiChangeNotificationService.uiChanged.next(
                    { key: CHANGE_NOTIFICATION_KEYS.SEARCH_ITEM_CHANGED, value: 'true' });
            }
        }
    }
}
