import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotifierService} from '../../shared/notifier.service';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css'],
})
export class EditAssigmentComponent implements OnInit {
  assignment: Assignment;
  nomassignment: string;
  dateDeRendu: Date;
  nomeleve: string;
  resultat: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService,
    private snackBar: MatSnackBar,
    private notifierService: NotifierService

  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignment();
  }

  deconnexion() {
    //suppression de la variable de session
    localStorage.removeItem('connexion');
    this.router.navigate(['/']);
  }

  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    let id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT EDIT ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      //console.log(assignment);
      this.assignment = assignment;
      if (assignment) {
        this.nomassignment = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
        this.nomeleve = assignment.nomEleve;
      }
    });
  }

  onSaveAssignment() {
      if (this.nomassignment) {
        this.assignment.nom = this.nomassignment;
      }

      if (this.dateDeRendu) {
        this.assignment.dateDeRendu = this.dateDeRendu;
      }
      if (this.nomeleve) {
        this.assignment.nomEleve = this.nomeleve;
      }

      this.assignmentsService
        .updateAssignment(this.assignment)
        .subscribe((reponse) => {
          console.log(reponse.message);
          // on navigue vers la page d'accueil
          this.router.navigate(['/home']);
        });
      this.notifierService.showNotification('MOdification éffectuée !!!', 'OK', 'info');

  }
}
