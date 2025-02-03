import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
navigateToProfile() {
throw new Error('Method not implemented.');
}
  name: string = "Lucas";

  constructor() { }

  ngOnInit(): void {
  }

}
