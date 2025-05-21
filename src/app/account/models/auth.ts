
export interface LoginRequest{
  username: string,
  pass: string
}

export interface LoginResponse{
  username: string,
  email: string,
  lastconnexion: Date,
  idUser: number,
  token: string,
}
