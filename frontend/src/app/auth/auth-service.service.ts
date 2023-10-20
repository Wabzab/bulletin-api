import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private http: HttpClient, private router: Router) { }

  register(pUsername: string, pPassword: string) {
    this.http.post(
      'https://localhost:3000/api/users/signup',
      { username: pUsername, password: pPassword }
    ).subscribe(response => {
      console.log(response);
      this.router.navigate(["/login"])
    })
  }

  login(pUsername: string, pPassword: string) {
    this.http.post<{ token: string }>(
      'https://localhost:3000/api/users/login',
      { username: pUsername, password: pPassword }
    ).subscribe(response => {
      console.log(response)
      const token = response.token;
      this.token = token;
      this.router.navigate(["/bulletins"])
    })
  }

  getToken() {
    return this.token;
  }
}
