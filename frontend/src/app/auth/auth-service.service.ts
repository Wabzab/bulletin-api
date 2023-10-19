import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private http: HttpClient) { }

  register(pUsername: string, pPassword: string) {
    this.http.post(
      'https://localhost:3000/api/users/signup',
      { username: pUsername, password: pPassword }
    ).subscribe(response => {
      // Move use back to login page probs
    })
  }

  login(pUsername: string, pPassword: string) {
    this.http.post<{ token: string }>(
      'https://localhost:3000/api/users/login',
      { username: pUsername, password: pPassword }
    ).subscribe(response => {
      const token = response.token;
      this.token = token;
    })
  }

  getToken() {
    return this.token;
  }
}
