import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) { }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      alert("Username/Password Invalid")
      return
    }
    this.authService.login(
      loginForm.value.username,
      loginForm.value.password
    )
    loginForm.resetForm()
  }

}
