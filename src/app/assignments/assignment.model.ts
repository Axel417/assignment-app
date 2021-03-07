import { Matiere } from './matiere.model';

export class Assignment {
  _id?: string;
  id: number;
  nom: string;
  dateDeRendu: Date;
  rendu?: boolean;
  nomEleve: string;
  note: number;
  remarque: string;
  nomMatiere: string;
  imageMatiere: string;
  imageProf: string;
}
