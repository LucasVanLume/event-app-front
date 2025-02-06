// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { UseCase } from 'src/app/core/utils/usecase';
// import { LoginRepository } from '../repositories/login.repository';
// import { UserEntity } from '../entities/user.entity';

// export interface GetUserProfileParams {
//   userId: string;
// }

// export class GetUserProfileUseCase implements UseCase<GetUserProfileParams, UserEntity> {
//   constructor(private loginRepository: LoginRepository) { }

//   execute(params: GetUserProfileParams): Observable<UserEntity> {
//     return this.loginRepository.getUserProfile({ userId: params.userId }).pipe(
//       catchError(error => {
//         const applicationError = new Error('Failed to get user profile');
//         return throwError(() => applicationError);
//       })
//     );
//   }
// }