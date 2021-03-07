import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  titre = 'Bienvenue dans le gestionnaire des étudiants';
  hide = true;
  constructor(private authService: AuthService, private router: Router) {}

  logins: string;
  passwords: string;

  login(tocken: string ) {
    console.log('login :' + tocken);
    if (!this.authService.loggedIn) {
      this.authService.logIn(tocken);
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }
}
