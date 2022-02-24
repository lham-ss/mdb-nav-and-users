import { Component, OnInit } from '@angular/core';
import { AuthService } from './serivces/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'mdb-nav-login';
  public isLoggedIn: boolean = false;


  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    this.auth.loggedIn$.subscribe(val => this.isLoggedIn = val);
  }


}
