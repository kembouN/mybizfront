import { Pays } from "../../shared/models/pays";

export interface CollaborateurRequest {
  idEntreprise: number,
  idPays: number,
  nomCollaborateur: string,
  telephoneUn: string;
  telephoneDeux: string,
  ville: string,
  adresse: string
};

export interface CollaborateurRsponse {
  idCollaborateur: number,
  pays: Pays,
  nom: string,
  telephoneUn: string;
  telephoneDeux: string,
  ville: string,
  adresse: string,
  tache: number
};
