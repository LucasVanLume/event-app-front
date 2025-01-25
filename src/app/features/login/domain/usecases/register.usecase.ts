import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UseCase } from 'src/app/core/utils/usecase';
import { LoginRepository } from '../repositories/login.repository';
import { UserEntity } from '../entities/user.entity';

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export class RegisterUseCase implements UseCase<RegisterParams, UserEntity> {
  constructor(private loginRepository: LoginRepository) { }

  execute(params: RegisterParams): Observable<UserEntity> {
    return this.loginRepository.register({ username: params.username, email: params.email, password: params.password }).pipe(
      catchError(error => {
        const applicationError = new Error('Failed to register');
        return throwError(() => applicationError);
      })
    );
  }
}