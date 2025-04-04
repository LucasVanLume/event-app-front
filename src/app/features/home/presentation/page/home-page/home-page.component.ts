import { Component, ViewChild } from '@angular/core';
import { EventsListComponent } from '../../components/events-list/events-list.component';
import { EventEntity } from '../../../domain/entities/event.entity';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild(EventsListComponent) eventsListComponent!: EventsListComponent;
  
  showForm: boolean = true;
  selectedEvent!: EventEntity;

  username: string = '';
  token: string = '';
  userId: string = '';

  constructor(
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    const user = history.state.user;

    this.username = user.username;
    this.token = user.token;
    this.userId = user.userId;
  }

  onEventCreated(event: EventEntity) {
    this.eventsListComponent.filteredEvents.unshift(event);
    this.eventsListComponent.totalElements++;

    this.toastService.success(`Evento criado com sucesso!`);
    setTimeout(() => {
      this.onEventSelected(event);
    }, 500);
  }

  onNewEventForm() {
    this.showForm = true;
  }

  onEventSelected(event: EventEntity) {
    // console.log("Evento selecionado:", event);
    this.selectedEvent = event;
    this.showForm = false;
  }

}
