import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from './search.service';
import { UIChangeNotificationService } from '../shared/uichangenotification.service';
import { SESSION_KEYS, CHANGE_NOTIFICATION_KEYS } from '../shared/constants';
import { StorageService } from '../shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  protected searchResults: string;
  protected count: number = 0;
  protected p: number = 1;
  protected itemperpage: number;

  private uiChangeNotificationServiceSubscriber: any;
  private searchItem: string;

  constructor(private searchService: SearchService, private router: Router,
    private uiChangeNotificationService: UIChangeNotificationService, private storageService: StorageService ) {}

  ngOnInit() {
    if (this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM) != null) {
        this.searchItem = String(this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM));
        this.search(this.searchItem);
    }else {
      this.router.navigate(['/home']);
    }

    this.uiChangeNotificationServiceSubscriber = 
      this.uiChangeNotificationService.uiChanged.subscribe((data: { key: string, value: any }) => {
            if (data.key === CHANGE_NOTIFICATION_KEYS.SEARCH_ITEM_CHANGED) {
              if (this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM) != null) {
                this.searchItem = String(this.storageService.getStoredData(SESSION_KEYS.SEARCH_ITEM));
                this.search(this.searchItem);
              }
            }}
    );
  }

  ngOnDestroy() {
        this.uiChangeNotificationServiceSubscriber.unsubscribe();
  }

  search(item: string) {
    this.searchService.search(item, this.p).subscribe( data => {
      this.searchResults = data.search.results;
      this.count = data.search.result_count;
      this.itemperpage = data.search.per_page;

    });

    this.storageService.removeStoredData(SESSION_KEYS.SEARCH_ITEM);
  }

  pageChanged(p: number) {
    this.p = p;
    this.searchService.search(this.searchItem, p).subscribe( data => {
      this.searchResults = data.search.results;
    });

  }
}
