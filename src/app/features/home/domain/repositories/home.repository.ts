import { Observable } from 'rxjs';
import { AddressEntity } from '../entities/address.entity';
import { EventEntity } from '../entities/event.entity';

export abstract class HomeRepository {
  abstract getAddressByCep(params: { cep: string }): Observable<AddressEntity>;

  abstract createEvent(params: { eventEntity: EventEntity }): Observable<EventEntity>;

  abstract getAllEvents(): Observable<EventEntity[]>;
}
