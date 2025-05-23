export interface ClientRequest {
  idUser?: number,
  idService?: number,
  idEntreprise?: number,
  emailUn: string,
  emailDeux?: string,
  nom: string,
  isClient: number,
  telephoneUn: string,
  telephoneDeux?: string,
  idTranche?: number,
  idTypeprospect?: number
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
  typeprospectId: number
}
