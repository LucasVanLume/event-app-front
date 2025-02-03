import { Injectable } from '@angular/core';
import { AddressEntity } from '../entities/address.entity';
import { catchError, Observable, throwError } from 'rxjs';
import { UseCase } from 'src/app/core/utils/usecase';
import { HomeRepository } from '../repositories/home.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAddressUseCase implements UseCase<string, AddressEntity> {
  constructor(private homeRepository: HomeRepository) { }

  execute(cep: string): Observable<AddressEntity> {
    return this.homeRepository.getAddressByCep({cep: cep}).pipe(
      catchError(error => {
        const applicationError = new Error('Failed to get address');
        return throwError(() => applicationError);
      })
    )
  }
}
