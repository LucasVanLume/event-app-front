import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EventEntity } from "../../../domain/entities/event.entity";
import { GetAllEventsUseCase } from "../../../domain/usecases/get-all-events.usecase";


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  @Input() userId: string = "";
  @Output() eventSelected = new EventEmitter<EventEntity>();
  @Output() addEvent = new EventEmitter<void>();
  
  searchTerm = "";
  events: EventEntity[] = [];
  filteredEvents: EventEntity[] = this.events;
  selectedChip: string = 'all';
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  size: number = 15;

  constructor(private getAllEventsUseCase: GetAllEventsUseCase) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.getAllEventsUseCase.execute({ page: this.currentPage, size: this.size }).subscribe({
      next: (pageResponse) => {
        const { events, totalPages, totalElements } = pageResponse;
        this.events = events;
        this.filteredEvents = [...this.events];
        this.totalPages = totalPages;
        this.totalElements = totalElements;
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

  onEventClick(event: EventEntity) {
    this.eventSelected.emit(event);
  }

  onNewEventClick() {
    this.addEvent.emit();
  }

  onChipSelect(filter: string) {
    this.selectedChip = filter;
    this.loadEvents();
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadEvents();
    }
  }
}
