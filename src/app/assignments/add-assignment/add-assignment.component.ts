import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierService } from '../../shared/notifier.service';
import {empty} from "rxjs";





@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  assignments: Assignment[];

  nomDevoir = '';
  dateDeRendu: Date = null;
  nomEleve = '';
  //resultat: Assignment;
  resultat = '';
  matiere = [];
  unique: Assignment[];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private snack: MatSnackBarModule,
    private notifierService: NotifierService

) {}

  ngOnInit(): void {
    console.log('Demande des assignments via le service...');
    // on utilise le service pour récupérer la liste des assignments
    this.assignmentsService.getAssignments().subscribe((assignements) => {
      // on ne rentre ici que quand les données sont prêtes
      // par ex, le service peut utiliser une BD distance et des WebService
      // pour récupérer les données..
      this.assignments = assignements;
      console.log('Données reçues...');
      console.log(this.assignments);
      console.log(this.assignments[0].nomMatiere);



    });
    console.log('getAssignments appelé....');

  // initialisation des steper form
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

   this.deleteSame();
  }

  deconnexion(){
    //suppression de la variable de session
    localStorage.removeItem('connexion');
    this.router.navigate(['/']);
  }

  deleteSame() {

    this.assignmentsService.getAssignments().subscribe((resultat) => {
      console.log("trueeeeeeeeeee"),
        resultat.forEach(a => {
         this.matiere.push(a.nomMatiere);
        });
      console.log(this.matiere);
      this.unique = [...new Set(this.matiere)];
      console.log(this.unique);
    });


  }

  onSubmit(event) {

    if (this.nomDevoir !== '' && this.nomEleve !== '' && this.resultat !== '' ) {
    event.preventDefault();
    console.log('Dans submit nom = ' + this.nomDevoir + ' date = ' + this.dateDeRendu + 'nom eleve :' + this.nomEleve + ' nom matiere :' + this.resultat
    );
    let newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.nomEleve = this.nomEleve;
    newAssignment.note = null;
    newAssignment.remarque = null;
    newAssignment.nomMatiere = this.resultat;

    if ( this.resultat === 'Grails'){
      console.log("In grails");
      newAssignment.imageMatiere = 'assets/images/grails.png';
      newAssignment.imageProf = 'assets/images/codd.jpg';
      console.log(this.resultat);
    }
    else if (this.resultat === 'MongoDB'){
      newAssignment.imageMatiere = 'assets/images/mongo.jpg';
      newAssignment.imageProf = 'assets/images/alison.jpg';
    }
    else if (this.resultat === 'Hadoop'){
      newAssignment.imageMatiere = 'assets/images/hadoop.jpg';
      newAssignment.imageProf = 'assets/images/miranda.jpg';
    }
    else if (this.resultat  === 'Angular'){
      newAssignment.imageMatiere = 'assets/images/angular.png';
      newAssignment.imageProf = 'assets/images/buffa.jpeg';
    }





    // newAssignment.imageMatiere = this.resultat.imageMatiere;
    // newAssignment.imageProf = this.resultat.imageProf;

    console.log(' nommatier: ' + this.resultat + ' imagematiere :' + this.resultat + ' imageprof: ' + this.resultat);
    console.log ('test du newAssigment 3' + newAssignment.id + newAssignment.nom + newAssignment.dateDeRendu + newAssignment.rendu + newAssignment.nomEleve + newAssignment.note + newAssignment.remarque + newAssignment.nomMatiere + newAssignment.imageMatiere + newAssignment.imageProf);

    // on va utiliser directement le service
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        this.notifierService.showNotification('Insertion éffectuée !!!', 'OK', 'info');
        this.router.navigate(['/home']);
      });
  }
  }
}

