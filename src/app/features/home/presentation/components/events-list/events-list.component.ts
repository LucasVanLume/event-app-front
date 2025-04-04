import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { EventEntity } from "../../../domain/entities/event.entity";
import { GetAllEventsUseCase } from "../../../domain/usecases/get-all-events.usecase";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { GetFilterEventsUseCase } from "../../../domain/usecases/get-filter-events.usecase";
import { debounceTime, Subject } from "rxjs";


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

  @ViewChild('searchInput') searchInput!: ElementRef;
  themes: string[] = ['Tecnologia', 'Design'];
  filteredThemes: string[] = [];
  selectedTheme: string | null = null;

  private searchSubject = new Subject<string>();

  constructor(
    private getAllEventsUseCase: GetAllEventsUseCase,
    private getFilterEventsUseCase: GetFilterEventsUseCase
  ) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.searchEvents();
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  onSearchInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.includes('@') && !this.selectedTheme) {
      this.filteredThemes = this.themes.filter(theme => 
        theme.toLowerCase().includes(inputValue.split('@').pop()!.toLowerCase())
      );
    } else if (!this.selectedTheme) {
      this.filteredThemes = [];
    }
    this.searchTerm = inputValue.replace('@', '');
    this.searchSubject.next(inputValue);
  }

  onThemeSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedTheme = event.option.value;
    this.searchTerm = '';
    this.filteredThemes = [];
    this.searchEvents();
  }

  removeTheme() {
    this.selectedTheme = null;
    this.searchEvents();
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

  searchEvents(userId?: string) {
    this.getFilterEventsUseCase.execute({ title: this.searchTerm, theme: this.selectedTheme || '', page: this.currentPage, size: this.size, userId: userId || '' }).subscribe({
      next: (pageResponse) => {
        const { events, totalPages, totalElements } = pageResponse;
        this.events = events;
        this.filteredEvents = [...this.events];
        this.totalPages = totalPages;
        this.totalElements = totalElements;
      },
      error: (err) => {
        console.error("Erro ao carregar eventos filtrados:", err);
      }
    });
  }

  onEventClick(event: EventEntity) {
    this.eventSelected.emit(event);
  }

  onNewEventClick() {
    this.addEvent.emit();
  }

  onChipSelect(filter: string) {
    this.selectedChip = filter;
    if (filter === 'all') {
      this.loadEvents();
    } else if (filter === 'mine') {
      this.searchEvents(this.userId);
    }
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
