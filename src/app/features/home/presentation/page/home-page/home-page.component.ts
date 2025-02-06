import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  username: string = '';
  token: string = '';

  constructor() { }

  ngOnInit() {
    const user = history.state.user;

    this.username = user.username;
    this.token = user.token;
  }
}
