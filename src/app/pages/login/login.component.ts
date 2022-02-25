import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MdbNotificationService, MdbNotificationRef } from 'mdb-angular-ui-kit/notification';

import { AlertBasicComponent } from 'src/app/alert/alert-basic/alert-basic.component';

import { AuthService } from 'src/app/serivces/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  notificationRef: MdbNotificationRef<AlertBasicComponent> | null = null;
  returnUrl: string = '';

  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private auth: AuthService, private route: ActivatedRoute, private notificationService: MdbNotificationService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  async onSubmit() {
    let res: any = {};

    if (!this.loginForm.valid) {
      this.loginForm.reset();

      return;
    }

    try {
      res = await this.auth.login(this.loginForm.value, this.returnUrl);

      if (!res.auth) {
        this.openAlert('Login Error', 'Not authorized.');
      }

    }
    catch (err: any) {
      this.openAlert('Login Error', err.error.message);
    }
  }

  openAlert(title: string, message: string) {
    let options = {
      // position: "bottom-center",
      autohide: false,
      offset: 220,
      stacking: true,
      data: {
        title,
        message
      }
    };

    this.loginForm.disable();
    this.notificationRef = this.notificationService.open(AlertBasicComponent, options);
    this.notificationRef.onClose.subscribe(() => {
      this.loginForm.enable();
    });
  }



}
