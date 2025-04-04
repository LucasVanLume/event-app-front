import { UseCase } from "src/app/core/utils/usecase";
import { HomeRepository } from "../repositories/home.repository";
import { EventEntity } from "../entities/event.entity";
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class GetFilterEventsUseCase implements UseCase<{ title: string, theme: string, page: number, size: number }, { events: EventEntity[], totalPages: number, totalElements: number }> {
  constructor(private homeRepository: HomeRepository) {}

  execute(params: { title: string, theme: string, page: number, size: number, userId?: string }): Observable<{ events: EventEntity[], totalPages: number, totalElements: number }> {
    return this.homeRepository.getFilterEvents(params.title, params.theme, params.page, params.size, params.userId).pipe(
      catchError(error => {
        const applicationError = new Error('Failed to get filtered events');
        return throwError(() => applicationError);
      })
    );
  }
}
