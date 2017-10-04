import { Component } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { SESSION_KEYS, ROLES } from '../shared/constants';

@Component({
  selector: 'myaccountnav',
  templateUrl: './myaccountnav.component.html'
})
export class MyAccountNavComponent  {
  protected isAdmin: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.isAdmin = false;
    if (this.storageService.getStoredData(SESSION_KEYS.ROLE) != null &&
      this.storageService.getStoredData(SESSION_KEYS.ROLE) === ROLES.ADMIN) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
  }
}