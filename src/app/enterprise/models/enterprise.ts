
export interface EnterpriseRequest{
  idUser: number
  nom: string,
  email: string,
  description: string,
  telephone1?: number,
  telephone2?: number,
  localisation: string,
  // logo: File
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
  logo: Blob,
  responsable: string
}
