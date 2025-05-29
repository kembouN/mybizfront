import { ApiResponse } from './../../shared/models/api-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ServiceRequest, ServiceResponse } from '../models/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  addService(data: ServiceRequest):Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/service`, data)
  }

  getEntrepriseServices(idEntreprise: number): Observable<ApiResponse<ServiceResponse[]>> {
    return this.http.get<ApiResponse<ServiceResponse[]>>(`${this.apiBaseUrl}/service/getBy/entreprise/${idEntreprise}`)
  }

  updateService(idService: number, data: ServiceRequest): Observable<ApiResponse<ServiceResponse>> {
    return this.http.put<ApiResponse<ServiceResponse>>(`${this.apiBaseUrl}/service/${idService}`, data)
  }
}
