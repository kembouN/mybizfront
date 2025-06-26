import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { EnterpriseRequest, Enterprise } from '../models/enterprise';

@Injectable({
  providedIn: 'root'
})

export class EntrepriseService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  addEntreprise(data: EnterpriseRequest):Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/entreprise`, data)
  }

  getAllEntreprise(idUtilisateur: number): Observable<ApiResponse<Enterprise[]>> {
    return this.http.get<ApiResponse<Enterprise[]>>(`${this.apiBaseUrl}/entreprise/user/${idUtilisateur}`)
  }

  updateEntreprise(idEntreprise: number, data: EnterpriseRequest): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<any>>(`${this.apiBaseUrl}/entreprise/${idEntreprise}`, data)
  }

  getSpecificEntreprise(idEntreprise: number) : Observable<ApiResponse<Enterprise>> {
    return this.http.get<ApiResponse<Enterprise>>(`${this.apiBaseUrl}/entreprise/${idEntreprise}`)
  }
}
