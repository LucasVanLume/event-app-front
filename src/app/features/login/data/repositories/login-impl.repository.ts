import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginMapper } from '../mappers/login.mapper';
import { LoginRepository } from '../../domain/repositories/login.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { LoginDataSource } from '../datasources/login.datasource';

@Injectable({
  providedIn: 'root'
})
export class LoginRepositoryImpl implements LoginRepository {
  private loginMapper = new LoginMapper();

  constructor(private loginDataSource: LoginDataSource) { }

  login(params: { email: string, password: string }): Observable<UserEntity> {
    return this.loginDataSource.login(params.email, params.password).pipe(
      map(response => this.loginMapper.mapFrom(response)),
    );
  }

//   getUserProfile(params: { userId: string }): Observable<UserEntity> {
//     return this.loginDataSource.getUserProfile(params.userId).pipe(
//         map(response => this.loginMapper.mapFrom(response))
//   }
}