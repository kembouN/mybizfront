import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SousServiceRequest, SousServiceResponse } from '../models/sous-service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SousServiceService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  addSousService(data: SousServiceRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/sous-service`, data)
  }

  getAllSousService(idEntreprise: number) :Observable<ApiResponse<SousServiceResponse[]>> {
    return this.http.get<ApiResponse<SousServiceResponse[]>>(`${this.apiBaseUrl}/sous-service/get-by/enterprise/${idEntreprise}`)
  }

  updateSousService(idSousservice: number, data: SousServiceRequest): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiBaseUrl}/sous-service/${idSousservice}`, data)
  }
}
