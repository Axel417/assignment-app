import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierService } from '../shared/notifier.service';
import {AuthentificationService} from '../authentification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  titre = 'Bienvenue dans le gestionnaire des étudiants';
  hide = true;
  constructor(private authentificationservice: AuthentificationService, private authService: AuthService, private router: Router, private snackBar: MatSnackBarModule, private notifierService: NotifierService) {}
  formulaire: FormGroup;
  logins: string;
  passwords: string;

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.formulaire = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  connexion() {
    if (this.formulaire.valid){
      this.authentificationservice.login(this.formulaire.value).subscribe(result => {
        if (result.auth === true ){
          console.log(result.token);
          this.authService.logIn(result.token);
        }else if (result.auth == false ){
          this.notifierService.showNotification('Echec de Connexion !!!', 'OK', 'error');
          this.authService.logOut();
          this.router.navigate(['/']);
        }
      });
    }

  }

}
