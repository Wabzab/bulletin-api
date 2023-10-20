import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms'
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  username = new FormControl('',
    [
      Validators.required,
      Validators.email
    ]);
  password = new FormControl('',
    [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*]).{8,}')
    ]);

  constructor(public authService: AuthService) { }

  getUsernameError() {
    if (this.username.hasError('required')) {
      return 'You must enter a value.'
    }

    return this.username.hasError('email') ? 'Not a valid email.' : ''
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'You must enter a value.'
    } else if (this.password.hasError('minLength')) {
      return 'Must be at least 8 characters long.'
    }

    return this.password.hasError('pattern') ? 'Not a valid password.' : ''
  }

  onRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      alert('Username/password invalid!')
      return;
    }
    this.authService.register(
      this.username.value!,
      this.password.value!
    )
    registerForm.resetForm()
  }

}
