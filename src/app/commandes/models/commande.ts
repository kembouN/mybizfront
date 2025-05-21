export interface CommandeRequest {
  idService?: number,
  idClient?: number,
  avance?: number,
  dateAvance?: Date,
  dateContact?: Date,
  dateDebut?: Date,
  qte?: number,
  duree?: number,
  paye?: boolean,
  datePaiement?: Date,
  statut?:string,
  dateFin?: Date
}

export interface CommandeResponse {
  idCommande:number,
  client: string,
  service: string,
  dateCommande: Date,
  dateDebut: Date,
  qte: number,
  duree: number,
  dateFin: Date
  cout: number,
  avance: number,
  dateAvance: Date,
  paye: boolean,
  statutCommande: string,
  datePaiement: Date
}
