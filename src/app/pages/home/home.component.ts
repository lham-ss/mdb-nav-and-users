import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';
import { TokenService } from 'src/app/services/token.service';

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
    private socket: SocketService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokens.getUser();

    this.socket.onTestSocket().subscribe((data) => {
      console.log('data received from ws-test:', data);
    })
  }

  testButton(val: any) {
    console.log('testButton was pressed.');
    console.log(val);
    this.socket.testSocket();
  }

}
