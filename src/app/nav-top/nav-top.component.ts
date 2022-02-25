import { Component, OnInit } from '@angular/core';
import { AuthService } from '../serivces/auth.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.loggedIn$.subscribe(val => this.isLoggedIn = val);
  }

  logout(): void {
    this.auth.logout();
  }

}
