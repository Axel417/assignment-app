import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from '../shared/notifier.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;

  utilisateurs = [
    {"login": "martin", "motpass":"martin"},
    {"login": "louis", "motpass":"louis"}
  ];

  constructor(private router: Router, private notifierService: NotifierService) {}

  getStorage(){
    if (localStorage.getItem('connexion')){
      return true;
    }else{
      return false;
    }
     }

  logIn (tocken: string) {
      console.log('login:' + tocken);
      if (tocken){
        this.loggedIn = true;
        localStorage.setItem('connexion', 'true');
        console.log(localStorage.getItem('connexion'));
        console.log("Connexion réussie");
        this.notifierService.showNotification('Connexion Réussi !!!', 'OK', 'success');

        this.getStorage();

        this.router.navigate(['/home']);
      }else{
        console.log("Connexion échouée");
        this.notifierService.showNotification('Echec de Connexion !!!', 'OK', 'error');
      }
    }


  logOut() {
    this.loggedIn = false;
    localStorage.removeItem('connexion');
    console.log("Déconnexion réussie");
  }

  // cette méthode renvoie une promesse (on devra traiter le résultat avec un then...)
  // la valeur renvoyé (qu'on récupèrera dans le then(val => {....}) est la valeur
  // de la propriété loggedIn. En gros, si on est loggué, on est admin...
  isAdmin(): Promise<any> {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(localStorage.getItem('connexion'));
    });

    return isUserAdmin;
  }
}
