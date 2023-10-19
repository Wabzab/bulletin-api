import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  onRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      alert('Username/password invalid!')
      return;
    }
    this.authService.register(
      registerForm.value.username,
      registerForm.value.password
    )
    registerForm.resetForm()
  }

}
