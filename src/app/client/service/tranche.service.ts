import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Tranche, Typeprospect } from '../models/tranche-type-propect';
import { ApiResponse } from '../../shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrancheService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  getAllTranche(): Observable<ApiResponse<Tranche[]>> {
    return this.http.get<ApiResponse<Tranche[]>>(`${this.apiBaseUrl}/tranche-age`)
  }

  getAllProspect(): Observable<ApiResponse<Typeprospect[]>> {
    return this.http.get<ApiResponse<Typeprospect[]>>(`${this.apiBaseUrl}/type-prospect`)
  }
}
