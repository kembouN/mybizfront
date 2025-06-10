import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CollaborateurRequest, CollaborateurRsponse } from '../model/collaborateur';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  addCollaborateur(data: CollaborateurRequest): Observable<ApiResponse<any>> {
    console.log(data);
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/collaborateur`, data)
  }

  getAllEtsCollaborateurs(idEts: number): Observable<ApiResponse<CollaborateurRsponse[]>> {
    return this.http.get<ApiResponse<CollaborateurRsponse[]>>(`${this.apiBaseUrl}/collaborateur/get-by/entreprise/${idEts}`)
  }

  updateCollaborateur(idCollab: number, data: CollaborateurRequest): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiBaseUrl}/collaborateur/${idCollab}`, data)
  }

}
