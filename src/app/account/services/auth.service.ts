import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/models/api-response';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { RegisterRequest } from '../models/register';
import { UpdateUser } from '../models/update-user';
import { ChangePasswordRequest } from '../models/change-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl = environment.apiBaseUrl;
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  userLogin(data: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiBaseUrl}/user/login`, data);
  }

  userRegistration(data: RegisterRequest): Observable<ApiResponse<any>>{
    console.log(data);
    return this.http.post<ApiResponse<any>>(`${this.apiBaseUrl}/user/register`, data);
  }

  isTokenExpired(): boolean {
    let token = localStorage.getItem("userToken");
    if(!token) return true;

    try {
      let decodedToken = jwtDecode(token);
      let expiry = decodedToken.exp ? new Date(decodedToken.exp* 1000) : null;
      return expiry ? new Date() > expiry : true;
    } catch (error) {
      return true;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("userToken");
  }

  logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  updateUser(idUser: number, data: UpdateUser) :Observable<ApiResponse<LoginResponse>> {
    return this.http.put<ApiResponse<LoginResponse>>(`${this.apiBaseUrl}/user/${idUser}`, data);
  }

  changePassword(idUser: number, data: ChangePasswordRequest) :Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiBaseUrl}/user/${idUser}/password-update`, data);
  }

}
