import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms'
import { AuthService } from '../auth-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = new FormControl('',
    [
      Validators.required
    ]);
  password = new FormControl('',
    [
      Validators.required
    ]);

  constructor(public authService: AuthService) { }

  getUsernameError() {
    if (this.username.hasError('required')) {
      return 'You must enter a value.'
    }

    return ''
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'You must enter a value.'
    }

    return ''
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      alert("Username/Password Invalid")
      return
    }
    this.authService.login(
      this.username.value!,
      this.password.value!
    )
    loginForm.resetForm()
  }

}
