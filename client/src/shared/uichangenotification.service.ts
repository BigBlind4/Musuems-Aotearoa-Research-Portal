import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UIChangeNotificationService {
    public uiChanged: Subject<{ key: string, value: string }> = new Subject<{ key: string, value: string }>();

}