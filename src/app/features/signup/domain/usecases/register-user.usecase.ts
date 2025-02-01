import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UseCase } from 'src/app/core/utils/usecase';
import { UserSignupEntity } from '../entities/user-signup.entity'; 
import { SignupRepository } from '../repositories/signup.repository';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class RegisterUserUseCase implements UseCase<UserSignupEntity, void> {
  constructor(private signupRepository: SignupRepository) { }

  execute(params: UserSignupEntity): Observable<void> {
    return this.signupRepository.register({ userSignupEntity: params }).pipe(
      catchError(error => {
        const applicationError = new Error('Failed to register');
        return throwError(() => applicationError);
      })
    );
  }
}