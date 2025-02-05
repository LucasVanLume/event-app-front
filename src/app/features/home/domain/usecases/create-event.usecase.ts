import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UseCase } from 'src/app/core/utils/usecase';
import { Injectable } from '@angular/core';
import { EventEntity } from '../entities/event.entity';
import { HomeRepository } from '../repositories/home.repository';

@Injectable({
    providedIn: 'root',
  })
export class CreateEventUseCase implements UseCase<EventEntity, EventEntity> {
  constructor(private homeRepository: HomeRepository) { }

  execute(params: EventEntity): Observable<EventEntity> {
    return this.homeRepository.createEvent({ eventEntity: params }).pipe(
      catchError(error => {
        const applicationError = new Error('Failed to create event');
        return throwError(() => applicationError);
      })
    );
  }
}