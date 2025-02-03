import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressResponseModel } from '../models/response/address-response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeDataSource {
  private apiUrl = 'https://brasilapi.com.br/api/cep/v1';

  constructor(private httpClient: HttpClient) {}

  getAddressByCep(cep: string): Observable<AddressResponseModel> {
    return this.httpClient.get<AddressResponseModel>(`${this.apiUrl}/${cep}`);
  }
}
