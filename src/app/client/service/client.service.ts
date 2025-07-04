import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ClientRequest, ClientResponse } from '../models/client';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { Pays } from '../../shared/models/pays';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  addClient(data: ClientRequest): Observable<ApiResponse<any>> {
    console.log(data)
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/client`, data)
  }

  getAllRegisteredClient(): Observable<ApiResponse<ClientResponse[]>> {
    return this.http.get<ApiResponse<ClientResponse[]>>(`${this.apiBaseUrl}/client`)
  }

  updateClient(idClient: number, data: ClientRequest): Observable<ApiResponse<ClientResponse>> {
    return this.http.put<ApiResponse<ClientResponse>>(`${this.apiBaseUrl}/client/${idClient}`, data)
  }

  getAllClientByEntreprise(
    idEts: number,
    nomClient?: string,
    typeClient?:string,
    localisation?: string,
    typeprospect?: number| string
  ): Observable<ApiResponse<ClientResponse[]>> {
    return this.http.get<ApiResponse<ClientResponse[]>>(
      `${this.apiBaseUrl}/client/get-by/entreprise/${idEts}?nom=${nomClient}&typeClient=${typeClient}&localisation=${localisation}&typeProspect=${typeprospect}`
    )
  }

  getAllPays(): Observable<ApiResponse<Pays[]>> {
    return this.http.get<ApiResponse<Pays[]>>(`${this.apiBaseUrl}/pays`)
  }
}
