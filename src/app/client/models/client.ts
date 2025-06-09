import { Pays } from "../../shared/models/pays";

export enum ClienType {
  PERSONNE_PHYSIQUE,
  PERSONNE_MORALE
}

export interface ClientRequest {
  idUser: number,
  idEntreprise: number,
  emailUn: string,
  emailDeux: string,
  nom: string,
  isClient: number,
  telephoneUn: string,
  telephoneDeux: string,
  idTranche: number,
  idTypeprospect: number,
  typeClient: string,
  agentLiaison: string,
  paysId: number,
  ville: string,
  adresse: string,
  // isWhatsapp: number
}

export interface ClientResponse {
  idClient: number,
  code:string,
  emailUn: string,
  emailDeux: string,
  telephoneUn: string,
  telephoneDeux: string,
  nomClient: string,
  statut: string,
  tranche: string,
  trancheId: number,
  typeprospectId: number,
  typeClient: string,
  agentLiaison: string;
  ville: string,
  adresse: string,
  pays: Pays,
  // isWhatsapp: number
}
