import { Component, ViewChild } from '@angular/core';
import { EventsListComponent } from '../../components/events-list/events-list.component';
import { EventEntity } from '../../../domain/entities/event.entity';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild(EventsListComponent) eventsListComponent!: EventsListComponent;
  
  username: string = '';
  token: string = '';
  userId: string = '';

  constructor() { }

  ngOnInit() {
    const user = history.state.user;

    this.username = user.username;
    this.token = user.token;
    this.userId = user.userId;
  }

  onEventCreated(event: EventEntity) {
    this.eventsListComponent.filteredEvents.unshift(event);
  }

}
