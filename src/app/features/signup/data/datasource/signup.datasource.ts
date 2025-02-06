import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserSignupEntity } from '../../domain/entities/user-signup.entity';

@Injectable({
  providedIn: 'root'
})
export class SignupDataSource {
  private apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  signup(params: { userSignupEntity: UserSignupEntity }): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/register`, { name: params.userSignupEntity.name, email: params.userSignupEntity.email, password: params.userSignupEntity.password }).pipe(
      tap((value) => {})
    );
  }
}