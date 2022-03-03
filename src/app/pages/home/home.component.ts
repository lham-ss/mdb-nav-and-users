import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/serivces/api.service';
import { TokenService } from 'src/app/serivces/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(
    private api: ApiService,
    private tokens: TokenService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokens.getUser();
  }

  testButton(val: any) {
    console.log('testButton was pressed.');
    console.log(val);
  }

}
