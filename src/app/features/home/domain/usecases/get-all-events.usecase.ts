import { UseCase } from "src/app/core/utils/usecase";
import { HomeRepository } from "../repositories/home.repository";
import { EventEntity } from "../entities/event.entity";
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class GetAllEventsUseCase implements UseCase<void, EventEntity[]> {
  constructor(private homeRepository: HomeRepository) {}

  execute(): Observable<EventEntity[]> {
    return this.homeRepository.getAllEvents().pipe(
      catchError(error => {
        const applicationError = new Error('Failed to get all events');
        return throwError(() => applicationError);
      })
    );
  }
}
