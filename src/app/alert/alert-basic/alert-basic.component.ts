import { Component } from '@angular/core';
import { MdbNotificationRef } from 'mdb-angular-ui-kit/notification';

@Component({
  selector: 'app-alert-basic',
  templateUrl: './alert-basic.component.html',
  styleUrls: ['./alert-basic.component.scss']
})
export class AlertBasicComponent {
  public message: string = 'Set this message please.';
  public title: string = 'Default Title';

  constructor(public notificationRef: MdbNotificationRef<AlertBasicComponent>) { }

}
