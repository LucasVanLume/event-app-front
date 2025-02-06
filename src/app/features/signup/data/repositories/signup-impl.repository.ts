import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SignupRepository } from '../../domain/repositories/signup.repository';
import { SignupDataSource } from '../datasource/signup.datasource';
import { UserSignupEntity } from '../../domain/entities/user-signup.entity';


@Injectable({
  providedIn: 'root'
})
export class SignupRepositoryImpl implements SignupRepository {

  constructor(private signupDataSource: SignupDataSource) { }

  register(params: { userSignupEntity: UserSignupEntity }): Observable<void> {
    return this.signupDataSource.signup(params);
  }
}