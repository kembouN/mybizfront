import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CommandeRequest, CommandeResponse } from '../models/commande';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  addCommande(data: CommandeRequest): Observable<ApiResponse<any>> {
    console.log(data);
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/commande`, data)
  }

  getAllCommandesByEntreprise(idEntreprise: number): Observable<ApiResponse<CommandeResponse[]>> {
    return this.http.get<ApiResponse<CommandeResponse[]>>(`${this.apiBaseUrl}/commande/get-by/entreprise/${idEntreprise}`)
  }
}
