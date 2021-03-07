import { HttpClient } from '@angular/common/http';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }
  login(data): Observable<any>{
    //return this.http.post('http://localhost:3000/api/auth/connexion', data);
    return this.http.post('https://api-connexion.herokuapp.com/api/auth/connexion', data);
  }
}
