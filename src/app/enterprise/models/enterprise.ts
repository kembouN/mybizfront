import { Pays } from "../../shared/models/pays"

export interface EnterpriseRequest{
  idUser: number
  nom: string,
  email: string,
  description: string,
  telephone1: number,
  telephone2: number,
  idPays: number,
  ville: string,
}

export interface Enterprise{
  entrepriseId: number,
  code: string,
  nom: string,
  email: string,
  description: string,
  telephone1: number,
  telephone2: number,
  localisation: string,
  logo: any,
  responsable: string
  pays: Pays,
  ville: string,
  nbrClient: number
}
