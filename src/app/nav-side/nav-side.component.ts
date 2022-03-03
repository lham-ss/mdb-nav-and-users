import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
  @Input('sharedData') shared!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
