import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private readonly http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  sendMessage(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/messages/text`, data);
  }
}
