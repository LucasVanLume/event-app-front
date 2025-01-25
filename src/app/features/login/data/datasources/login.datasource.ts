import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from 'src/app/shared/types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginDataSource {
  private apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        })
    );
  }

  signup(name: string, email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, { name, email, password }).pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        })
      );
  }
}