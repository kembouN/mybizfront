export interface ElementCommandeRequest {
  idElement?: number | string,
  idSousservice: number | string,
  quantite: number | string,
  prix: number |string
};

export interface CommandeRequest {
  idClient?: string | number,
  avance?: number,
  dateAvance?: Date,
  dateContact?: Date,
  paye?: number,
  datePaiement?: Date,
  dateFin?: Date,
  items: ElementCommandeRequest[]
};

export interface CommandeResponse {
  idClient: number;
  idCommande:number,
  client: string,
  service: string,
  dateCommande: Date,
  dateFin: Date
  cout: number,
  avance: number,
  dateAvance: Date,
  paye: number,
  statutCommande: string,
  collaborateur: string,
  datePaiement: Date,
  elements:ElementCommandeRequest[]
};
