import { Component, Input, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalnoteComponent } from '../modalnote/modalnote.component';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis: Assignment;
  recupnote: number;
  recupappreciation: string;
  //recupremarque: string;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  deconnexion(){
    //suppression de la variable de session
    localStorage.removeItem('connexion');
    this.router.navigate(['/']);
  }

  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    let id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT DETAIL ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      //console.log(assignment);
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {



    //Ouverture du modal
    const dialogRef = this.dialog.open(ModalnoteComponent, {
      width: '250px',
      disableClose: true
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.recupnote = result;
      console.log(result);
      if(this.recupnote){

        this.assignmentTransmis.rendu = true;
        this.assignmentTransmis.note = this.recupnote;
        this.assignmentsService
          .updateAssignment(this.assignmentTransmis)
          .subscribe((message) => {
            console.log(message);
            // on retourne à la page d'accueil
            this.router.navigate(['/home']);
          });
      }
    });

    }

  onDelete() {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.assignmentTransmis = null;

        // on retourne à la page d'accueil
        this.router.navigate(['/home']);
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: { nom: 'toto', age: '30' },
      fragment: 'edition',
    });
  }

  loggedIn() {
    console.log(this.authService.getStorage());
    return this.authService.getStorage();
  }
}
