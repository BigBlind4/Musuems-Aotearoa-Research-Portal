import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from './search.service';
import { ActivatedRoute } from '@angular/router';
import { UIChangeNotificationService } from '../shared/uichangenotification.service';
import { SESSION_KEYS, CHANGE_NOTIFICATION_KEYS } from '../shared/constants';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  protected searchResults: string;
  protected count: number = 0;
 // protected sourceUrl: string;

  private uiChangeNotificationServiceSubscriber: any;

  constructor(private searchService: SearchService, private activatedRouter: ActivatedRoute,
    private uiChangeNotificationService: UIChangeNotificationService, private storageService: StorageService ) {}

  ngOnInit() {
    if (this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM) != null) {
        let item = String(this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM));
        this.search(item);
    }

    this.uiChangeNotificationServiceSubscriber = 
      this.uiChangeNotificationService.uiChanged.subscribe((data: { key: string, value: any }) => {
            if (data.key === CHANGE_NOTIFICATION_KEYS.SEARCH_ITEM_CHANGED) {
              if (this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM) != null) {
                let item = String(this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM));
                this.search(item);
                // this.activatedRouter.params.subscribe(params => {
                //   this.search(item);
                // });
              }
            }}
    );
  }

  ngOnDestroy() {
        this.uiChangeNotificationServiceSubscriber.unsubscribe();
  }

  search(item: string) {
    this.searchService.search(item).subscribe( data => {
      this.searchResults = data.search.results;
      this.count = this.searchResults.length;
    });

    this.storageService.removeStoredData(SESSION_KEYS.SEARCH_ITEM);
  }


}
