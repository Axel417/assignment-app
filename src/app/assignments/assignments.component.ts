import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignmentSelectionne: Assignment;
  // tableau des assignments
  assignments: Assignment[];
  assignment = [];
  assignementTrue = [] ;
  assignementfalse = [] ;
  valeur: string;

  data: Array<any>;
  totalRecords: Number;
  totalRecords1: Number;
  totalRecords2: Number;
  page: Number=1;

  constructor(private assignmentService: AssignmentsService,
              private route: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valeur = 'tout';
    console.log('Demande des assignments via le service...');
    // on utilise le service pour récupérer la liste des assignments
    console.log('getAssignments appelé....');
    this.getAllAssignement();
    this.getAssignementFalse();
    this.getTrueAssignments();
  }

  change(choixutilisateur: string){
      this.valeur = choixutilisateur;
      this.cdr.detectChanges();
  }

  /**
   * fonction de déconnexion de l'utilisateur
   */
  deconnexion(){
    //suppression de la variable de session
    localStorage.removeItem('connexion');
    this.route.navigate(['/']);
  }
  onNouvelAssignment(newAssignment: Assignment) {
    //this.assignments.push(newAssignment);
    this.assignmentService.addAssignment(newAssignment).subscribe((message) => {
      // on ne rentre ici que quand l'ajout (insert) a bien été
      // effectué !
      console.log(message);
    });

    // et on cache le formulaire et on réaffiche la liste à jour
    //this.formVisible = false;
  }

  getAllAssignement(){

    this.assignmentService.getAssignments().subscribe((assignements) => {
      // on ne rentre ici que quand les données sont prêtes
      // par ex, le service peut utiliser une BD distance et des WebService
      // pour récupérer les données..
      this.assignments = assignements;
      this.cdr.detectChanges();
      // pour la pagination
      this.data = assignements;
      this.totalRecords = assignements.length;
      console.log('Données reçues...');

    });
  }
  // tslint:disable-next-line:typedef
  getTrueAssignments() {
    this.assignmentService.getAssignments().subscribe((assignments) => {
      console.log(""),
        assignments.forEach(a => {
          if (a.rendu === true) {
            this.assignementTrue.push(a);
          }
        });
      this.data = this.assignementTrue;
      this.totalRecords1 = this.assignementTrue.length;
    });
  }

  // tslint:disable-next-line:typedef
  getAssignementFalse(){
    this.assignmentService.getAssignments().subscribe((assignments) => {
      console.log(""),
        assignments.forEach(a => {
          if (a.rendu === false) {
            this.assignementfalse.push(a);
          }
        });
      this.data = this.assignementfalse;
      this.totalRecords2 = this.assignementfalse.length;
    });
  }


}
