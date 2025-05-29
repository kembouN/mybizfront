export interface ServiceRequest {
  idUser: number,
  idEntreprise: number,
  description: string,
  libelle: string,
  dureeInitiale?: number,
  prixInitial?: number,
  qteInitiale?: number
}

export interface ServiceResponse {
  idService: number,
  description: string,
  libelle: string,
  dureeInitiale?: number,
  prixInitial: number,
  qteInitiale?: number
}
