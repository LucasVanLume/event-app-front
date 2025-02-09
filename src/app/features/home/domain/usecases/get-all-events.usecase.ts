import { UseCase } from "src/app/core/utils/usecase";
import { HomeRepository } from "../repositories/home.repository";
import { EventEntity } from "../entities/event.entity";
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class GetAllEventsUseCase implements UseCase<{ page: number, size: number }, { events: EventEntity[], totalPages: number, totalElements: number }> {
  constructor(private homeRepository: HomeRepository) {}

  execute(params: { page: number, size: number }): Observable<{ events: EventEntity[], totalPages: number, totalElements: number }> {
    return this.homeRepository.getAllEvents(params.page, params.size).pipe(
      catchError(error => {
        const applicationError = new Error('Failed to get all events');
        return throwError(() => applicationError);
      })
    );
  }
}
