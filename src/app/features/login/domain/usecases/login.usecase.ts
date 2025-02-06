import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UseCase } from 'src/app/core/utils/usecase';
import { LoginRepository } from '../repositories/login.repository';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@angular/core';

export interface LoginParams {
  email: string;
  password: string;
}

@Injectable({
    providedIn: 'root',
  })
export class LoginUseCase implements UseCase<LoginParams, UserEntity> {
  constructor(private loginRepository: LoginRepository) { }

  execute(params: LoginParams): Observable<UserEntity> {
    return this.loginRepository.login({ email: params.email, password: params.password }).pipe(
      catchError(error => {
        const applicationError = new Error('Failed to login');
        return throwError(() => applicationError);
      })
    );
  }
}