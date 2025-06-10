export interface SousServiceRequest {
  idService: number | string,
  libelle: string,
  description: string,
  duree: number | string,
  unite: string
}

export interface SousServiceResponse {
  idSousService: number,
  libelle: string,
  description: string,
  idService: number,
  libelleService: string,
  duree: number,
  unite: string
}
