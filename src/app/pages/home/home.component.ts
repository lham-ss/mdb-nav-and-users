import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/serivces/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testResults = null;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  testButton(val: any) {
    console.log('testButton was pressed.');
    console.log(val);
  }

}
