import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../serivces/auth.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {
  @Input('sharedData') shared!: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.auth.logout();
  }

}
