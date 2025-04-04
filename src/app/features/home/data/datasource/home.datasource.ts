import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressResponseModel } from '../models/response/address-response.model';
import { EventEntity } from '../../domain/entities/event.entity';
import { ApiEndpoints } from 'src/app/shared/utils/constants/api-endpoints.constants';
import { EventMapper } from '../mappers/event.mapper';
import { EventResponseModel } from '../models/response/event-response.model';
import { PageEventResponseModel } from '../models/response/page-event-response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeDataSource {

  constructor(private httpClient: HttpClient) {}

  getAddressByCep(cep: string): Observable<AddressResponseModel> {
    return this.httpClient.get<AddressResponseModel>(`${ApiEndpoints.GET_ADDRESS}/${cep}`);
  }

  createEvent(eventEntity: EventEntity): Observable<EventEntity> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const eventRequest = EventMapper.toRequestModel(eventEntity);
    return this.httpClient.post<EventEntity>(
      `${ApiEndpoints.CREATE_EVENT}`,
      eventRequest,
      { headers }
    );
  }

  getAllEvents(page: number, size: number): Observable<PageEventResponseModel> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.httpClient.get<PageEventResponseModel>(
      `${ApiEndpoints.GET_ALL_EVENTS}?page=${page}&size=${size}`,
      { headers }
    );
  }

  getFilterEvents(title: string, theme: string, page: number, size: number, userId?: string): Observable<PageEventResponseModel> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.httpClient.get<PageEventResponseModel>(
      `${ApiEndpoints.GET_FILTERED_EVENTS}?title=${title}&theme=${theme}&page=${page}&size=${size}&user=${userId}`,
      { headers }
    );
  }
  
}
