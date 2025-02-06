import { Component, Input, OnInit } from "@angular/core";
import { EventEntity } from "../../../domain/entities/event.entity";
import { GetAllEventsUseCase } from "../../../domain/usecases/get-all-events.usecase";


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  @Input() userId: string = "";
  
  searchTerm = "";
  events: EventEntity[] = [];
  filteredEvents: EventEntity[] = this.events;

  constructor(private getAllEventsUseCase: GetAllEventsUseCase) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.getAllEventsUseCase.execute().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = [...this.events];
      },
      error: (err) => {
        console.error("Erro ao carregar eventos:", err);
      }
    });
  }

  searchEvents() {
    if (!this.searchTerm) {
      this.filteredEvents = this.events;
      return;
    }

    this.filteredEvents = this.events.filter((event) =>
      event.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addNewEvent() {
    console.log("Add new event clicked");
  }
}
