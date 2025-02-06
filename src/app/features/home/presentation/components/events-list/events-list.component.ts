import { Component, type OnInit } from "@angular/core"

interface Event {
  name: string
  date: Date
}

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  searchTerm = ""
  events: Event[] = [
    { name: "Indoor Women Training Day I", date: new Date("2021-09-12") },
    { name: "Game Under 14 Boys", date: new Date("2021-09-12") },
    { name: "Inter School Basketball Tournament", date: new Date("2021-09-12") },
    { name: "Indoor Women Training Day II", date: new Date("2021-09-12") },
    { name: "Indoor Women Training Day III", date: new Date("2021-09-12") },
    { name: "Game U16 Girls", date: new Date("2021-09-12") },
    { name: "Game U21 Girls", date: new Date("2021-09-12") },
    { name: "Committee Meeting", date: new Date("2021-09-12") },
    { name: "Hookin2Hockey", date: new Date("2021-09-12") },
    { name: "Annual Sports Conference", date: new Date("2021-09-12") },
    { name: "National League Finals", date: new Date("2021-09-12") },
    { name: "Community Sports Day", date: new Date("2021-09-12") },
    { name: "Youth Soccer Cup", date: new Date("2021-09-12") },
    { name: "Basketball Tryouts", date: new Date("2021-09-12") },
    { name: "Regional Athletics Meet", date: new Date("2021-09-12") },
    { name: "Professional Coaching Workshop", date: new Date("2021-09-12") },
    { name: "State Volleyball Championship", date: new Date("2021-09-12") },
    { name: "High School Sports Gala", date: new Date("2021-09-12") },
    { name: "College Rugby Tournament", date: new Date("2021-09-12") },
    { name: "Summer Training Camp", date: new Date("2021-09-12") },
    { name: "Fitness and Wellness Expo", date: new Date("2021-09-12") }
  ];  
  filteredEvents: Event[] = this.events

  ngOnInit() {
    this.searchEvents()
  }

  searchEvents() {
    if (!this.searchTerm) {
      this.filteredEvents = this.events
      return
    }

    this.filteredEvents = this.events.filter((event) =>
      event.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    )
  }

  addNewEvent() {
    console.log("Add new event clicked")
  }
}

