import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddressEntity } from '../../domain/entities/address.entity';
import { HomeRepository } from '../../domain/repositories/home.repository';
import { AddressMapper } from '../mappers/address.mapper';
import { HomeDataSource } from '../datasource/home.datasource';
import { EventEntity } from '../../domain/entities/event.entity';

@Injectable({
  providedIn: 'root'
})
export class HomeRepositoryImpl implements HomeRepository {
  private addressMapper = new AddressMapper();

  constructor(private homeDataSource: HomeDataSource) { }

  getAddressByCep(params: { cep: string }): Observable<AddressEntity> {
    return this.homeDataSource.getAddressByCep(params.cep).pipe(
      map(response => this.addressMapper.mapFrom(response)),
    );
  }

  createEvent(params: { eventEntity: EventEntity }): Observable<EventEntity> {
    return this.homeDataSource.createEvent(params.eventEntity).pipe(
      map(response => {
        return response;
      })
    );
  }
}