import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalnote',
  templateUrl: './modalnote.component.html',
  styleUrls: ['./modalnote.component.css']
})
export class ModalnoteComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ModalnoteComponent>) { }

note: number;
remarque: string;


  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validation(): void {
    console.log('Note depuis modalnote' + this.note);
    this.dialogRef.close(this.note);
    //this.dialogRef.close(this.remarque);
  }
}
