import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() username: string = "";
  @Input() token: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    throw new Error('Method not implemented.');
  }

  navigateToProfile() {
    throw new Error('Method not implemented.');
  }
}
