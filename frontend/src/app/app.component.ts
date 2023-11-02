import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  onLoginClicked() {
    this.router.navigate(['/login']);
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

}
